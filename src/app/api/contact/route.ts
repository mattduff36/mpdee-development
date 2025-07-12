import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/utils/email';
import { validateEmail, validateRequired } from '@/utils/validation';

// Configure timeout for this API route
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    // Add timeout for serverless functions
    const timeoutPromise = new Promise<NextResponse>(resolve => {
      setTimeout(() => {
        resolve(
          NextResponse.json(
            { error: 'Request timeout. Please try again.' },
            { status: 408 }
          )
        );
      }, 25000); // 25 seconds for Vercel
    });

    const processRequest = async () => {
      const body = await request.json();
      const { name, email, phone, projectDetails } = body;

      // Validate required fields
      if (!validateRequired(name)) {
        return NextResponse.json(
          { error: 'Name is required' },
          { status: 400 }
        );
      }

      if (!validateRequired(email)) {
        return NextResponse.json(
          { error: 'Email is required' },
          { status: 400 }
        );
      }

      if (!validateEmail(email)) {
        return NextResponse.json(
          { error: 'Please enter a valid email address' },
          { status: 400 }
        );
      }

      // Validate optional fields
      if (phone && phone.trim().length > 0 && phone.trim().length < 10) {
        return NextResponse.json(
          { error: 'Please enter a valid phone number' },
          { status: 400 }
        );
      }

      if (projectDetails && projectDetails.trim().length > 1000) {
        return NextResponse.json(
          { error: 'Project details must be less than 1000 characters' },
          { status: 400 }
        );
      }

      // Send email
      const success = await sendContactFormEmail({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim(),
        projectDetails: projectDetails?.trim(),
      });

      if (!success) {
        return NextResponse.json(
          { error: 'Failed to send email. Please try again.' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: 'Message sent successfully!' },
        { status: 200 }
      );
    };

    // Race between request processing and timeout
    return await Promise.race([processRequest(), timeoutPromise]);
  } catch (error) {
    console.error('Contact form error:', error);

    // More specific error handling
    if (error instanceof Error) {
      // Check for authentication errors
      if (
        error.message.includes('authentication') ||
        error.message.includes('password')
      ) {
        return NextResponse.json(
          {
            error: 'Email service configuration error. Please contact support.',
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
