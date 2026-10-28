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
  let transporter: ReturnType<typeof nodemailer.createTransport> | undefined;
  let deliveryTimeout: ReturnType<typeof setTimeout> | undefined;

  try {
    // Check if Gmail SMTP is configured
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!smtpUser || !smtpPass || !contactEmail) {
      console.error(
        'Gmail SMTP configuration missing. Please check your environment variables.'
      );
      return false;
    }

    // Create transporter for Gmail SMTP
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 15000,
    });

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://development.mpdee.co.uk';

    // Prepare email content
    const mailOptions = {
      from: `"MPDEE Contact Form" <${smtpUser}>`,
      to: contactEmail,
      subject: `New Contact Form Submission from ${formData.name}`,
      html: generateEmailHTML(formData, siteUrl),
      replyTo: formData.email, // Allow replying directly to the person who submitted
    };

    // Send email with Gmail SMTP
    // Return within the route's 30-second budget even if the transport stalls.
    // SMTP stage timeouts bound the underlying connection independently.
    await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise<never>((_, reject) => {
        deliveryTimeout = setTimeout(
          () => reject(new Error('Email delivery timed out')),
          20000
        );
      }),
    ]);

    console.log('Email sent successfully via Gmail SMTP');
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  } finally {
    if (deliveryTimeout) clearTimeout(deliveryTimeout);
    transporter?.close();
  }
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const generateEmailHTML = (
  formData: EmailFormData,
  siteUrl: string
): string => {
  const name = escapeHtml(formData.name);
  const email = escapeHtml(formData.email);
  const phone = formData.phone ? escapeHtml(formData.phone) : '';
  const projectDetails = formData.projectDetails
    ? escapeHtml(formData.projectDetails)
    : '';
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    ${
      projectDetails
        ? `<p><strong>Project Details:</strong></p><p>${projectDetails}</p>`
        : ''
    }
    <hr>
    <p><small>This email was sent from the contact form at <a href="${escapeHtml(siteUrl)}">${escapeHtml(siteUrl)}</a></small></p>
  `;
};
