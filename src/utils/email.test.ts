import { sendContactFormEmail } from './email';

const mockSendMail = jest.fn();
const mockClose = jest.fn();
const mockCreateTransport = jest.fn();

jest.mock('nodemailer', () => ({
  __esModule: true,
  default: {
    createTransport: (...args: unknown[]) => mockCreateTransport(...args),
  },
}));

const originalEnv = process.env;
const payload = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '07123 456789',
  projectDetails: 'A new business website',
};

describe('contact email delivery', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'log').mockImplementation();
    process.env = {
      ...originalEnv,
      SMTP_USER: 'sender@example.com',
      SMTP_PASS: 'test-password-not-a-secret',
      CONTACT_EMAIL: 'recipient@example.com',
      NEXT_PUBLIC_SITE_URL: 'https://development.mpdee.co.uk',
    };
    mockSendMail.mockReset().mockResolvedValue({
      accepted: ['recipient@example.com'],
    });
    mockClose.mockReset();
    mockCreateTransport.mockReset().mockReturnValue({
      sendMail: mockSendMail,
      close: mockClose,
    });
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it.each(['test', 'production'] as const)(
    'reports failure when SMTP is missing in %s',
    async environment => {
      process.env = { ...process.env, NODE_ENV: environment };
      delete process.env.SMTP_PASS;
      expect(await sendContactFormEmail(payload)).toBe(false);
      expect(mockCreateTransport).not.toHaveBeenCalled();
      expect(mockSendMail).not.toHaveBeenCalled();
      expect(jest.getTimerCount()).toBe(0);
    }
  );

  it('reports success only after SMTP resolves and closes the transport', async () => {
    expect(await sendContactFormEmail(payload)).toBe(true);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'recipient@example.com',
        replyTo: 'test@example.com',
        subject: 'New Contact Form Submission from Test User',
      })
    );
    expect(mockCreateTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 15000,
      })
    );
    expect(mockClose).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('reports SMTP failure without leaving a timer or connection open', async () => {
    mockSendMail.mockRejectedValue(new Error('SMTP unavailable'));
    expect(await sendContactFormEmail(payload)).toBe(false);
    expect(mockClose).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('bounds response time and cleans up when SMTP stalls', async () => {
    mockSendMail.mockReturnValue(new Promise(() => {}));
    const delivery = sendContactFormEmail(payload);
    await jest.advanceTimersByTimeAsync(20000);
    expect(await delivery).toBe(false);
    expect(mockClose).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('escapes user text before inserting it into the HTML message', async () => {
    await sendContactFormEmail({
      ...payload,
      name: '<script>test</script>',
      projectDetails: '<img src=x onerror=alert(1)> & a quotation "here"',
    });
    const message = mockSendMail.mock.calls[0][0];
    expect(message.html).toContain('&lt;script&gt;test&lt;/script&gt;');
    expect(message.html).toContain('&lt;img');
    expect(message.html).not.toContain('<img src=x');
    expect(message.html).toContain('&amp;');
  });
});
