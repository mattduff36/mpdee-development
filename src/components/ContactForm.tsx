'use client';

import { useState, useCallback } from 'react';
import { track } from '@vercel/analytics';
import {
  Column,
  Row,
  Button,
  Input,
  Textarea,
  Text,
  Card,
  Heading,
  RevealFx,
} from '@once-ui-system/core';
import { validateEmail } from '@/utils/validation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectDetails: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  projectDetails?: string;
}

interface FormState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError: string | null;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectDetails: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSubmitted: false,
    submitError: null,
  });

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2)
      newErrors.name = 'Name must be at least 2 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email))
      newErrors.email = 'Please enter a valid email address';

    if (formData.phone.trim() && formData.phone.trim().length < 10)
      newErrors.phone = 'Please enter a valid phone number';

    if (
      formData.projectDetails.trim() &&
      formData.projectDetails.trim().length > 1000
    )
      newErrors.projectDetails =
        'Project details must be less than 1000 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      setErrors(prev =>
        prev[name as keyof FormErrors] ? { ...prev, [name]: undefined } : prev
      );
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;

      setFormState({
        isSubmitting: true,
        isSubmitted: false,
        submitError: null,
      });

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to send message');
        }

        track('contact_form_submit', {
          source: 'contact_page',
          status: 'success',
        });
        setFormState({
          isSubmitting: false,
          isSubmitted: true,
          submitError: null,
        });
        setFormData({ name: '', email: '', phone: '', projectDetails: '' });
      } catch (error) {
        setFormState({
          isSubmitting: false,
          isSubmitted: false,
          submitError:
            error instanceof Error
              ? error.message
              : 'Failed to send message. Please try again or contact us directly.',
        });
      }
    },
    [validateForm, formData]
  );

  if (formState.isSubmitted) {
    return (
      <RevealFx translateY="4" fillWidth>
        <Card fillWidth padding="32" radius="l" border="brand-alpha-medium">
          <Column gap="16" horizontal="center" fillWidth>
            <Heading as="h3" variant="heading-strong-l" align="center">
              Message Sent!
            </Heading>
            <Text
              variant="body-default-m"
              onBackground="neutral-weak"
              align="center"
            >
              Thank you for getting in touch. We&apos;ll respond within 24
              hours.
            </Text>
            <Button
              variant="secondary"
              onClick={() =>
                setFormState(prev => ({ ...prev, isSubmitted: false }))
              }
            >
              Send Another Message
            </Button>
          </Column>
        </Card>
      </RevealFx>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Column gap="20" fillWidth>
        <Input
          id="contact-name"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          errorMessage={errors.name}
          required
        />
        <Input
          id="contact-email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          errorMessage={errors.email}
          required
        />
        <Input
          id="contact-phone"
          name="phone"
          label="Phone (optional)"
          value={formData.phone}
          onChange={handleInputChange}
          error={!!errors.phone}
          errorMessage={errors.phone}
        />
        <Textarea
          id="contact-details"
          name="projectDetails"
          label="Tell us about your project"
          value={formData.projectDetails}
          onChange={handleInputChange}
          error={!!errors.projectDetails}
          errorMessage={errors.projectDetails}
          lines={5}
        />

        {formState.submitError && (
          <Text variant="body-default-s" onBackground="danger-strong">
            {formState.submitError}
          </Text>
        )}

        <Row gap="12">
          <Button
            type="submit"
            variant="primary"
            size="l"
            loading={formState.isSubmitting}
          >
            {formState.isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </Row>
      </Column>
    </form>
  );
}
