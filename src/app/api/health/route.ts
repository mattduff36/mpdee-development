import { NextResponse } from 'next/server';

// Configure timeout for this API route
export const maxDuration = 30;

export async function GET() {
  try {
    // Check if required environment variables are present
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactEmail = process.env.CONTACT_EMAIL;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const envStatus = {
      smtp_user: !!smtpUser,
      smtp_pass: !!smtpPass,
      contact_email: !!contactEmail,
      site_url: !!siteUrl,
    };

    const allConfigured = Object.values(envStatus).every(Boolean);

    const isProduction = process.env.NODE_ENV === 'production';

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      deployment: process.env.VERCEL_ENV || 'local',
      email_config: {
        configured: allConfigured,
        ...(isProduction ? {} : { details: envStatus }),
      },
      message: allConfigured
        ? 'Email service is properly configured'
        : 'Email service needs environment variables to be configured in Vercel',
    });
  } catch {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 500 }
    );
  }
}
