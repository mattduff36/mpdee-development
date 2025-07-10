'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { validateEmail } from '@/utils/validation';
import { sendEmail } from '@/utils/email';

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

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const ContactForm = ({ 
  title = "Get in Touch", 
  subtitle = "Ready to start your project? Let's discuss how we can help bring your vision to life.",
  className = ""
}: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectDetails: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSubmitted: false,
    submitError: null
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation (required)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation (required)
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional, but if provided should be valid)
    if (formData.phone.trim() && formData.phone.trim().length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Project details validation (optional)
    if (formData.projectDetails.trim() && formData.projectDetails.trim().length > 1000) {
      newErrors.projectDetails = 'Project details must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormState({
      isSubmitting: true,
      isSubmitted: false,
      submitError: null
    });

    try {
      await sendEmail({
        to: 'contact@example.com', // This would be the site owner's email
        subject: `New Project Inquiry from ${formData.name}`,
        text: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

Project Details:
${formData.projectDetails || 'No details provided'}
        `,
        html: `
<h2>New Project Inquiry</h2>
<p><strong>Name:</strong> ${formData.name}</p>
<p><strong>Email:</strong> ${formData.email}</p>
<p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
<h3>Project Details:</h3>
<p>${formData.projectDetails || 'No details provided'}</p>
        `
      });

      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        submitError: null
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectDetails: ''
      });

    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        submitError: 'Failed to send message. Please try again or contact us directly.'
      });
    }
  };

  const handleCloseSuccess = () => {
    setFormState(prev => ({
      ...prev,
      isSubmitted: false
    }));
  };

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your name"
                aria-describedby={errors.name ? 'name-error' : undefined}
                required
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
                required
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="(555) 123-4567"
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700 mb-2">
              Project Details
            </label>
            <textarea
              id="projectDetails"
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleInputChange}
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-vertical ${
                errors.projectDetails ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
              aria-describedby={errors.projectDetails ? 'projectDetails-error' : undefined}
            />
            {errors.projectDetails && (
              <p id="projectDetails-error" className="mt-1 text-sm text-red-600">
                {errors.projectDetails}
              </p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Submit project inquiry"
            >
              {formState.isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </div>

          {formState.submitError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{formState.submitError}</p>
            </div>
          )}
        </motion.form>
      </div>

      {/* Success Overlay */}
      {formState.isSubmitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleCloseSuccess}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your message has been sent successfully. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={handleCloseSuccess}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ContactForm; 