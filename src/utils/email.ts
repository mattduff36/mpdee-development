// Email notification utilities
import nodemailer from 'nodemailer';

interface EmailFormData {
  name: string;
  email: string;
  phone?: string;
  projectDetails?: string;
}

export const sendContactFormEmail = async (
  formData: EmailFormData
): Promise<boolean> => {
  try {
    // Check if Gmail SMTP is configured
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!smtpUser || !smtpPass || !contactEmail) {
      console.error('Gmail SMTP configuration missing. Please check your environment variables.');
      return false;
    }

    // Create transporter for Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      // Optimize for serverless environments
      pool: false, // Disable connection pooling for serverless
      maxConnections: 1,
      maxMessages: 1,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Prepare email content
    const mailOptions = {
      from: `"MPDEE Contact Form" <${smtpUser}>`,
      to: contactEmail,
      subject: `New Contact Form Submission from ${formData.name}`,
      html: generateEmailHTML(formData, siteUrl),
      replyTo: formData.email, // Allow replying directly to the person who submitted
    };

    // Send email with Gmail SMTP
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully via Gmail SMTP');
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

// Alias export for backward compatibility
export const sendEmail = sendContactFormEmail;

const generateEmailHTML = (
  formData: EmailFormData,
  siteUrl: string
): string => {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${formData.name}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
    ${
      formData.projectDetails
        ? `<p><strong>Project Details:</strong></p><p>${formData.projectDetails}</p>`
        : ''
    }
    <hr>
    <p><small>This email was sent from the contact form at <a href="${siteUrl}">${siteUrl}</a></small></p>
  `;
};

// Future implementation functions (commented out for now)
/*
async function sendWithSendGrid(emailContent: any): Promise<boolean> {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  try {
    await sgMail.send(emailContent);
    return true;
  } catch (error) {
    console.error('SendGrid error:', error);
    return false;
  }
}

async function sendWithSMTP(emailContent: any): Promise<boolean> {
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  
  try {
    await transporter.sendMail(emailContent);
    return true;
  } catch (error) {
    console.error('SMTP error:', error);
    return false;
  }
}
*/
