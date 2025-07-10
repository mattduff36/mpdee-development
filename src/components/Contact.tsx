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

const Contact = () => {
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
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your project? Let's discuss how we can help bring your vision to life.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Let's Work Together
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We're here to help you create something amazing. Whether you need a simple website 
                  or a complex web application, we'll work with you every step of the way.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">hello@example.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Response Time</h4>
                    <p className="text-gray-600">Usually within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Free Consultation</h4>
                    <p className="text-gray-600">No obligation project discussion</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your full name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label 
                    htmlFor="phone" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your phone number"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Project Details Field */}
                <div>
                  <label 
                    htmlFor="projectDetails" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Project Details <span className="text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical ${
                      errors.projectDetails ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell us about your project, goals, timeline, etc."
                    aria-invalid={!!errors.projectDetails}
                    aria-describedby={errors.projectDetails ? 'project-error' : undefined}
                  />
                  {errors.projectDetails && (
                    <p id="project-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.projectDetails}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.projectDetails.length}/1000 characters
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    formState.isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {formState.isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Error Message */}
                {formState.submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm" role="alert">
                      {formState.submitError}
                    </p>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {formState.isSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg max-w-md w-full p-8 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={handleCloseSuccess}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Contact; 