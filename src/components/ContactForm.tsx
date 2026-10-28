'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { track } from '@vercel/analytics';
import { validateEmail, validatePhone } from '@/utils/validation';
import styles from './ContactForm.module.css';

type FormData = {
  name: string;
  email: string;
  phone: string;
  projectDetails: string;
};

type FieldName = keyof FormData;
type FormErrors = Partial<Record<FieldName, string>>;

const emptyForm: FormData = {
  name: '',
  email: '',
  phone: '',
  projectDetails: '',
};
const unconfirmedMessage =
  'We couldn’t confirm delivery. Your message is still here — please try again or email Matt directly.';

export function ContactForm({ initialInterest }: { initialInterest?: string }) {
  const [formData, setFormData] = useState<FormData>(() => ({
    ...emptyForm,
    projectDetails: initialInterest
      ? `I’m interested in ${initialInterest.slice(0, 120)}.\n\n`
      : '',
  }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const requestPending = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);
  useEffect(() => {
    if (isSubmitted) successRef.current?.focus();
  }, [isSubmitted]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setFormData(previous => ({ ...previous, [name]: value }));
    setErrors(previous => ({ ...previous, [name]: undefined }));
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!formData.email.trim())
      nextErrors.email = 'Please enter your email address.';
    else if (!validateEmail(formData.email.trim()))
      nextErrors.email = 'Please enter a valid email address.';
    if (formData.phone.trim() && !validatePhone(formData.phone.trim()))
      nextErrors.phone =
        'Please enter a valid phone number, including the country code if needed.';
    if (formData.projectDetails.trim().length > 1000)
      nextErrors.projectDetails =
        'Please keep your message to 1,000 characters or fewer.';
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      const input = formRef.current?.elements.namedItem(firstInvalid);
      if (input instanceof HTMLElement) input.focus();
      return false;
    }
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestPending.current || !validate()) return;
    requestPending.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    const controller = new AbortController();
    controllerRef.current = controller;
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 30000);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          projectDetails: formData.projectDetails.trim(),
        }),
        signal: controller.signal,
      });
      const data: unknown = await response.json().catch(() => null);
      const result =
        data && typeof data === 'object'
          ? (data as Record<string, unknown>)
          : null;
      if (!response.ok) {
        throw new Error(
          typeof result?.error === 'string' ? result.error : unconfirmedMessage
        );
      }
      if (result?.message !== 'Message sent successfully!') {
        throw new Error(unconfirmedMessage);
      }

      setIsSubmitted(true);
      setFormData(emptyForm);
      // Analytics must never turn a successfully sent enquiry into an error.
      try {
        track('contact_form_submit', {
          source: 'contact_page',
          status: 'success',
        });
      } catch {
        /* optional */
      }
    } catch (error) {
      if (controller.signal.aborted && !timedOut) return;
      setSubmitError(
        timedOut
          ? 'This is taking longer than expected. We couldn’t confirm whether your message was sent. Please email Matt before resending to avoid a duplicate.'
          : error instanceof Error && error.name !== 'TypeError'
            ? error.message
            : unconfirmedMessage
      );
    } finally {
      clearTimeout(timeout);
      requestPending.current = false;
      controllerRef.current = null;
      if (!controller.signal.aborted || timedOut) setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div
        className={styles.success}
        ref={successRef}
        tabIndex={-1}
        role="status"
      >
        <span className={styles.successIcon} aria-hidden="true">
          ✓
        </span>
        <p className={styles.eyebrow}>A GOOD FIRST STEP</p>
        <h2>
          Message sent.
          <br />
          Let’s make something good.
        </h2>
        <p>
          Thanks for getting in touch. Matt will reply to the email address you
          provided.
        </p>
        <button
          className={styles.secondaryButton}
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setSubmitError(null);
          }}
        >
          Send another message <span aria-hidden="true">↗</span>
        </button>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
    >
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Alex Taylor"
            maxLength={100}
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name && (
            <p
              className={styles.fieldError}
              id="contact-name-error"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@yourbusiness.co.uk"
            maxLength={254}
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email && (
            <p
              className={styles.fieldError}
              id="contact-email-error"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-phone">
          Phone number <span className={styles.optional}>(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="If you’d prefer a call"
          maxLength={40}
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
        />
        {errors.phone && (
          <p
            className={styles.fieldError}
            id="contact-phone-error"
            role="alert"
          >
            {errors.phone}
          </p>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-details">
          Tell me about your project{' '}
          <span className={styles.optional}>(optional)</span>
        </label>
        <textarea
          id="contact-details"
          name="projectDetails"
          rows={5}
          maxLength={1000}
          placeholder="What are you working on? What would you like your website or app to do? A rough idea is plenty."
          value={formData.projectDetails}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.projectDetails)}
          aria-describedby={`contact-details-hint${errors.projectDetails ? ' contact-details-error' : ''}`}
        />
        <div className={styles.fieldMeta} id="contact-details-hint">
          <span>No finished brief needed.</span>
          <span>
            {formData.projectDetails.length.toLocaleString('en-GB')} / 1,000
          </span>
        </div>
        {errors.projectDetails && (
          <p
            className={styles.fieldError}
            id="contact-details-error"
            role="alert"
          >
            {errors.projectDetails}
          </p>
        )}
      </div>
      {submitError && (
        <div className={styles.submitError} role="alert">
          <p>{submitError}</p>
          <a href="mailto:sendme@mpdee.info">
            Email sendme@mpdee.info <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
      <div className={styles.submitRow}>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending your message…' : 'Send message'}
          {isSubmitting ? (
            <span className={styles.spinner} aria-hidden="true" />
          ) : (
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 19 19 5M5 5h14v14"
                stroke="currentColor"
                strokeWidth="1.7"
              />
            </svg>
          )}
        </button>
        <p className={styles.privacy}>
          Your details are used to reply to your enquiry.
        </p>
      </div>
      <p className={styles.requiredNote}>* Required fields</p>
    </form>
  );
}
