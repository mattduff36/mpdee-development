interface EmailFormData {
  name: string;
  email: string;
  phone?: string;
  projectDetails?: string;
}

const RESEND_EMAILS_URL = 'https://api.resend.com/emails';
const CONTACT_RECIPIENT = 'admin@mpdee.co.uk';
const DELIVERY_TIMEOUT_MS = 20000;

export const sendContactFormEmail = async (
  formData: EmailFormData
): Promise<boolean> => {
  const abort = new AbortController();
  let deliveryTimeout: ReturnType<typeof setTimeout> | undefined;

  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const emailFrom = process.env.EMAIL_FROM?.trim();

    if (!apiKey || !emailFrom) {
      console.error(
        'Resend configuration missing. Please check your environment variables.'
      );
      return false;
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://development.mpdee.co.uk';

    deliveryTimeout = setTimeout(() => abort.abort(), DELIVERY_TIMEOUT_MS);

    const response = await fetch(RESEND_EMAILS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [CONTACT_RECIPIENT],
        reply_to: formData.email,
        subject: `New Contact Form Submission from ${formData.name}`,
        html: generateEmailHTML(formData, siteUrl),
      }),
      signal: abort.signal,
    });

    if (!response.ok) {
      console.error('Failed to send email');
      return false;
    }

    const id = await readEmailId(response);
    if (!id) {
      console.error('Failed to send email');
      return false;
    }

    console.log('Email sent successfully');
    return true;
  } catch (error) {
    if (isAbortError(error)) {
      console.error('Email delivery timed out');
    } else {
      console.error('Failed to send email');
    }
    return false;
  } finally {
    if (deliveryTimeout) clearTimeout(deliveryTimeout);
  }
};

async function readEmailId(response: Response): Promise<string | null> {
  try {
    const data: unknown = await response.json();
    if (!data || typeof data !== 'object' || !('id' in data)) return null;
    const id = (data as { id?: unknown }).id;
    if (typeof id !== 'string') return null;
    const trimmed = id.trim();
    return trimmed.length > 0 ? trimmed : null;
  } catch {
    return null;
  }
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

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
