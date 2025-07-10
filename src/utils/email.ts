// Email notification utilities

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
    // Get environment variables
    const emailService = process.env.EMAIL_SERVICE || 'sendgrid';
    const contactEmail = process.env.CONTACT_EMAIL || 'contact@example.com';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Prepare email content
    const emailContent = {
      to: contactEmail,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com',
      subject: `New Contact Form Submission from ${formData.name}`,
      html: generateEmailHTML(formData, siteUrl),
    };

    // Log the email content for development
    // eslint-disable-next-line no-console
    console.log('Email service:', emailService);
    // eslint-disable-next-line no-console
    console.log('Email content:', emailContent);

    // In a real implementation, you would:
    switch (emailService) {
      case 'sendgrid':
        // return await sendWithSendGrid(emailContent);
        break;
      case 'smtp':
        // return await sendWithSMTP(emailContent);
        break;
      default:
        // eslint-disable-next-line no-console
        console.warn(`Unknown email service: ${emailService}`);
    }

    // Simulate successful email sending for development
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
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
