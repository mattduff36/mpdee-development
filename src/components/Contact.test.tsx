import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from './Contact';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock email utility
jest.mock('@/utils/email', () => ({
  sendEmail: jest.fn(),
}));

// Mock validation utility
jest.mock('@/utils/validation', () => ({
  validateEmail: jest.fn(),
}));

import { sendEmail } from '@/utils/email';
import { validateEmail } from '@/utils/validation';

const mockSendEmail = sendEmail as jest.MockedFunction<typeof sendEmail>;
const mockValidateEmail = validateEmail as jest.MockedFunction<
  typeof validateEmail
>;

describe('Contact Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockValidateEmail.mockImplementation((email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    });
  });

  it('renders contact section with correct structure', () => {
    render(<Contact />);

    // Check main heading
    expect(
      screen.getByRole('heading', { level: 2, name: /get in touch/i })
    ).toBeInTheDocument();

    // Check description
    expect(
      screen.getByText(/ready to start your project/i)
    ).toBeInTheDocument();

    // Check form elements
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument();
  });

  it('renders all form fields correctly', () => {
    render(<Contact />);

    // Check required fields
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    // Check optional fields
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project details/i)).toBeInTheDocument();

    // Check required indicators
    const requiredFields = screen.getAllByText('*');
    expect(requiredFields).toHaveLength(2); // Name and Email
  });

  it('renders contact information correctly', () => {
    render(<Contact />);

    // Check contact info headings
    expect(screen.getByText(/let's work together/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /email/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /response time/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /free consultation/i })
    ).toBeInTheDocument();

    // Check contact details
    expect(screen.getByText(/hello@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/usually within 24 hours/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Try to submit empty form
    fireEvent.click(submitButton);

    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });

    // Email should not be called
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const form = screen
      .getByRole('button', { name: /send message/i })
      .closest('form')!;

    // Fill in invalid email
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    // Mock validation to return false for invalid email
    mockValidateEmail.mockReturnValue(false);

    fireEvent.submit(form);

    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid email address/i)
      ).toBeInTheDocument();
    });

    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it('validates name length', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill in too short name
    fireEvent.change(nameInput, { target: { value: 'A' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/name must be at least 2 characters/i)
      ).toBeInTheDocument();
    });
  });

  it('validates phone number when provided', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill in valid name and email, invalid phone
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '123' } });

    mockValidateEmail.mockReturnValue(true);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid phone number/i)
      ).toBeInTheDocument();
    });
  });

  it('validates project details length', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const projectDetailsInput = screen.getByLabelText(/project details/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill in valid name and email, too long project details
    const longText = 'A'.repeat(1001);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(projectDetailsInput, { target: { value: longText } });

    mockValidateEmail.mockReturnValue(true);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/project details must be less than 1000 characters/i)
      ).toBeInTheDocument();
    });
  });

  it('shows character count for project details', () => {
    render(<Contact />);

    const projectDetailsInput = screen.getByLabelText(/project details/i);

    // Initially shows 0/1000
    expect(screen.getByText('0/1000 characters')).toBeInTheDocument();

    // Type some text
    fireEvent.change(projectDetailsInput, { target: { value: 'Hello world' } });

    // Should update character count
    expect(screen.getByText('11/1000 characters')).toBeInTheDocument();
  });

  it('clears errors when user starts typing', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Submit empty form to show errors
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    // Start typing in name field
    fireEvent.change(nameInput, { target: { value: 'J' } });

    // Error should be cleared
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const projectDetailsInput = screen.getByLabelText(/project details/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill in valid form data
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(projectDetailsInput, {
      target: { value: 'I need a website' },
    });

    mockValidateEmail.mockReturnValue(true);
    mockSendEmail.mockResolvedValue(undefined);

    fireEvent.click(submitButton);

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText(/sending.../i)).toBeInTheDocument();
    });

    // Should call sendEmail with correct data
    await waitFor(() => {
      expect(mockSendEmail).toHaveBeenCalledWith({
        to: 'contact@example.com',
        subject: 'New Project Inquiry from John Doe',
        text: expect.stringContaining('John Doe'),
        html: expect.stringContaining('John Doe'),
      });
    });

    // Should show success modal
    await waitFor(() => {
      expect(screen.getByText(/message sent!/i)).toBeInTheDocument();
    });
  });

  it('handles form submission error', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill in valid form data
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    mockValidateEmail.mockReturnValue(true);
    mockSendEmail.mockRejectedValue(new Error('Network error'));

    fireEvent.click(submitButton);

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
    });

    // Should not show success modal
    expect(screen.queryByText(/message sent!/i)).not.toBeInTheDocument();
  });

  it('closes success modal when close button is clicked', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill in and submit valid form
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    mockValidateEmail.mockReturnValue(true);
    mockSendEmail.mockResolvedValue(undefined);

    fireEvent.click(submitButton);

    // Wait for success modal
    await waitFor(() => {
      expect(screen.getByText(/message sent!/i)).toBeInTheDocument();
    });

    // Click close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Modal should be closed
    await waitFor(() => {
      expect(screen.queryByText(/message sent!/i)).not.toBeInTheDocument();
    });
  });

  it('resets form after successful submission', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill in form
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    mockValidateEmail.mockReturnValue(true);
    mockSendEmail.mockResolvedValue(undefined);

    fireEvent.click(submitButton);

    // Wait for success
    await waitFor(() => {
      expect(screen.getByText(/message sent!/i)).toBeInTheDocument();
    });

    // Close modal
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Form should be reset
    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
    });
  });

  it('has proper accessibility attributes', () => {
    render(<Contact />);

    // Check labels are associated with inputs
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const projectDetailsInput = screen.getByLabelText(/project details/i);

    expect(nameInput).toHaveAttribute('id', 'name');
    expect(emailInput).toHaveAttribute('id', 'email');
    expect(phoneInput).toHaveAttribute('id', 'phone');
    expect(projectDetailsInput).toHaveAttribute('id', 'projectDetails');

    // Check submit button is properly labeled
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument();
  });

  it('shows proper aria-invalid and aria-describedby attributes for errors', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Submit empty form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
      expect(nameInput).toHaveAttribute('aria-describedby', 'name-error');
      expect(screen.getAllByRole('alert')).toHaveLength(2); // Name and email errors
    });
  });

  it('disables submit button while submitting', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill in valid form
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    mockValidateEmail.mockReturnValue(true);

    // Mock sendEmail to never resolve to test loading state
    let resolveEmail: () => void;
    const emailPromise = new Promise<void>(resolve => {
      resolveEmail = resolve;
    });
    mockSendEmail.mockReturnValue(emailPromise);

    fireEvent.click(submitButton);

    // Button should be disabled while submitting
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(screen.getByText(/sending.../i)).toBeInTheDocument();
    });

    // Resolve the promise to clean up
    resolveEmail!();
  });
});
