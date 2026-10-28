import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/utils/email';
import { checkRateLimit } from '@/utils/rate-limit';
import {
  CONTACT_FIELD_LIMITS,
  validateEmail,
  validatePhone,
  validateRequired,
} from '@/utils/validation';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const { allowed, retryAfter } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: retryAfter ? { 'Retry-After': String(retryAfter) } : undefined,
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json(
      { error: 'Request body must be a JSON object' },
      { status: 400 }
    );
  }

  const fields = body as Record<string, unknown>;
  const name = typeof fields.name === 'string' ? fields.name.trim() : '';
  const email = typeof fields.email === 'string' ? fields.email.trim() : '';
  const phone = typeof fields.phone === 'string' ? fields.phone.trim() : '';
  const projectDetails =
    typeof fields.projectDetails === 'string'
      ? fields.projectDetails.trim()
      : '';

  if (!validateRequired(name)) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }
  if (name.length > CONTACT_FIELD_LIMITS.name) {
    return NextResponse.json(
      { error: 'Name must be 100 characters or fewer' },
      { status: 400 }
    );
  }
  if (!validateRequired(email)) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }
  if (!validateEmail(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address' },
      { status: 400 }
    );
  }
  if (fields.phone != null && typeof fields.phone !== 'string') {
    return NextResponse.json(
      { error: 'Please enter a valid phone number' },
      { status: 400 }
    );
  }
  if (!validatePhone(phone)) {
    return NextResponse.json(
      { error: 'Please enter a valid phone number' },
      { status: 400 }
    );
  }
  if (
    fields.projectDetails != null &&
    typeof fields.projectDetails !== 'string'
  ) {
    return NextResponse.json(
      { error: 'Project details must be text' },
      { status: 400 }
    );
  }
  if (projectDetails.length > CONTACT_FIELD_LIMITS.projectDetails) {
    return NextResponse.json(
      { error: 'Project details must be 1000 characters or fewer' },
      { status: 400 }
    );
  }

  try {
    const success = await sendContactFormEmail({
      name,
      email,
      phone,
      projectDetails,
    });

    if (!success) {
      return NextResponse.json(
        {
          error:
            'Your message could not be sent. Please try again or email sendme@mpdee.info.',
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form delivery failed:', error);
    return NextResponse.json(
      {
        error:
          'Your message could not be sent. Please try again or email sendme@mpdee.info.',
      },
      { status: 503 }
    );
  }
}
