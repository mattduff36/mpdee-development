import { NextResponse } from 'next/server';

// Configure timeout for this API route
export const maxDuration = 30;

export async function GET() {
  try {
    // Presence only. Values stay server-side and are never returned.
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const emailFrom = process.env.EMAIL_FROM?.trim();

    const envStatus = {
      resend_api_key: !!resendApiKey,
      email_from: !!emailFrom,
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
