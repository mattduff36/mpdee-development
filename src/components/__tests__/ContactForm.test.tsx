import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../ContactForm';

const mockFetch = jest.fn();
const sentResponse = {
  ok: true,
  json: async () => ({ message: 'Message sent successfully!' }),
};

beforeEach(() => {
  mockFetch.mockReset();
  global.fetch = mockFetch;
});

function fillRequired() {
  fireEvent.change(screen.getByLabelText(/your name/i), {
    target: { value: 'Alex Taylor' },
  });
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: 'alex@example.com' },
  });
}

describe('ContactForm', () => {
  it('labels required and optional fields and accepts a service prefill', () => {
    render(<ContactForm initialInterest="a new website" />);
    expect(screen.getByLabelText(/your name/i)).toBeRequired();
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute(
      'type',
      'email'
    );
    expect(screen.getByLabelText(/phone number/i)).not.toBeRequired();
    expect(screen.getByLabelText(/tell me about your project/i)).toHaveValue(
      'I’m interested in a new website.\n\n'
    );
    expect(
      screen.getByLabelText(/tell me about your project/i)
    ).toHaveAttribute('maxlength', '1000');
  });

  it('shows associated validation errors and focuses the first invalid field without sending', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText('Please enter your name.')).toHaveAttribute(
      'role',
      'alert'
    );
    expect(screen.getByLabelText(/your name/i)).toHaveFocus();
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('rejects invalid email addresses and clears their error when edited', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    fillRequired();
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'invalid' },
    });
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(
      screen.getByText('Please enter a valid email address.')
    ).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'alex@example.com' },
    });
    expect(
      screen.queryByText('Please enter a valid email address.')
    ).not.toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('sends trimmed values through the existing API and shows confirmation only after success', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce(sentResponse);
    render(<ContactForm />);
    fillRequired();
    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: ' Alex Taylor ' },
    });
    fireEvent.change(screen.getByLabelText(/tell me about your project/i), {
      target: { value: ' A new booking website. ' },
    });
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Alex Taylor',
          email: 'alex@example.com',
          phone: '',
          projectDetails: 'A new booking website.',
        }),
        signal: expect.any(AbortSignal),
      })
    );
    expect(
      await screen.findByRole('heading', { name: /message sent/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveFocus();
    await user.click(screen.getByRole('button', { name: /send another/i }));
    expect(screen.getByLabelText(/your name/i)).toHaveValue('');
  });

  it('preserves the message on API errors and provides a direct email fallback', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: 'Too many requests. Please try again later.',
      }),
    });
    render(<ContactForm />);
    fillRequired();
    fireEvent.change(screen.getByLabelText(/tell me about your project/i), {
      target: { value: 'Keep this brief.' },
    });
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Too many requests.'
    );
    expect(screen.getByLabelText(/tell me about your project/i)).toHaveValue(
      'Keep this brief.'
    );
    expect(screen.getByRole('link', { name: /email sendme/i })).toHaveAttribute(
      'href',
      'mailto:sendme@mpdee.info'
    );
    expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled();
    expect(
      screen.queryByRole('heading', { name: /message sent/i })
    ).not.toBeInTheDocument();
  });

  it.each([
    {
      ok: false,
      json: async () => {
        throw new SyntaxError('Unexpected token <');
      },
    },
    { ok: true, json: async () => ({}) },
  ])(
    'does not claim success for a malformed server response',
    async response => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce(response);
      render(<ContactForm />);
      fillRequired();
      await user.click(screen.getByRole('button', { name: /send message/i }));
      expect(await screen.findByRole('alert')).toHaveTextContent(
        'We couldn’t confirm delivery.'
      );
      expect(screen.getByLabelText(/your name/i)).toHaveValue('Alex Taylor');
    }
  );

  it('prevents duplicate submissions while a request is in progress', async () => {
    let resolveRequest!: (value: typeof sentResponse) => void;
    mockFetch.mockReturnValueOnce(
      new Promise(resolve => {
        resolveRequest = resolve;
      })
    );
    render(<ContactForm />);
    fillRequired();
    const form = screen
      .getByRole('button', { name: /send message/i })
      .closest('form')!;
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(
      screen.getByRole('button', { name: /sending your message/i })
    ).toBeDisabled();
    expect(mockFetch).toHaveBeenCalledTimes(1);
    await act(async () => resolveRequest(sentResponse));
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /message sent/i })
      ).toBeInTheDocument()
    );
  });

  it('preserves the draft and reports uncertain delivery when the connection fails', async () => {
    const user = userEvent.setup();
    mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    render(<ContactForm />);
    fillRequired();
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'We couldn’t confirm delivery.'
    );
    expect(screen.getByLabelText(/your name/i)).toHaveValue('Alex Taylor');
    expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled();
  });

  it('aborts a stalled request and warns against an accidental duplicate', async () => {
    jest.useFakeTimers();
    try {
      mockFetch.mockImplementationOnce(
        (_url: string, options: RequestInit) =>
          new Promise((_resolve, reject) => {
            options.signal?.addEventListener('abort', () =>
              reject(new DOMException('Aborted', 'AbortError'))
            );
          })
      );
      render(<ContactForm />);
      fillRequired();
      fireEvent.submit(
        screen.getByRole('button', { name: /send message/i }).closest('form')!
      );
      await act(async () => {
        jest.advanceTimersByTime(30000);
      });
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Please email Matt before resending to avoid a duplicate.'
      );
      expect(screen.getByLabelText(/your name/i)).toHaveValue('Alex Taylor');
      expect(
        screen.getByRole('button', { name: /send message/i })
      ).toBeEnabled();
      expect(mockFetch.mock.calls[0][1].signal.aborted).toBe(true);
    } finally {
      jest.useRealTimers();
    }
  });
});
