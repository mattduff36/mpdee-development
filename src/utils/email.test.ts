import { sendContactFormEmail } from './email';

const mockFetch = jest.fn();
const originalEnv = process.env;
const originalFetch = global.fetch;

const payload = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '07123 456789',
  projectDetails: 'A new business website',
};

function jsonResponse(
  body: unknown,
  ok = true,
  status = ok ? 200 : 422
): Response {
  return {
    ok,
    status,
    json: async () => body,
  } as Response;
}

function requestBody(): {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  html: string;
} {
  const init = mockFetch.mock.calls[0][1] as RequestInit;
  return JSON.parse(String(init.body));
}

function loggedText(spy: jest.SpyInstance): string {
  return spy.mock.calls
    .flat()
    .map(value => String(value))
    .join(' ');
}

describe('contact email delivery', () => {
  let errorSpy: jest.SpyInstance;
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    errorSpy = jest.spyOn(console, 'error').mockImplementation();
    logSpy = jest.spyOn(console, 'log').mockImplementation();
    process.env = {
      ...originalEnv,
      RESEND_API_KEY: 'test-resend-key',
      EMAIL_FROM: 'MPDEE Contact <contact@example.com>',
      NEXT_PUBLIC_SITE_URL: 'https://development.mpdee.co.uk',
    };
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.CONTACT_EMAIL;
    mockFetch.mockReset().mockResolvedValue(jsonResponse({ id: 'email_123' }));
    global.fetch = mockFetch;
  });

  afterEach(() => {
    process.env = originalEnv;
    global.fetch = originalFetch;
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it.each([
    ['test', 'RESEND_API_KEY'],
    ['production', 'EMAIL_FROM'],
  ] as const)(
    'reports failure when %s is missing %s',
    async (environment, missing) => {
      process.env = { ...process.env, NODE_ENV: environment };
      delete process.env[missing];
      expect(await sendContactFormEmail(payload)).toBe(false);
      expect(mockFetch).not.toHaveBeenCalled();
      expect(jest.getTimerCount()).toBe(0);
      expect(loggedText(errorSpy)).not.toContain('test-resend-key');
      expect(loggedText(errorSpy)).not.toContain(payload.email);
    }
  );

  it('posts the fixed recipient and visitor reply_to only after a nonempty id', async () => {
    expect(await sendContactFormEmail(payload)).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.resend.com/emails',
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: 'Bearer test-resend-key',
          'Content-Type': 'application/json',
        },
        signal: expect.any(AbortSignal),
      })
    );
    const body = requestBody();
    expect(body.from).toBe('MPDEE Contact <contact@example.com>');
    expect(body.to).toEqual(['admin@mpdee.co.uk']);
    expect(body.reply_to).toBe('test@example.com');
    expect(body.subject).toBe('New Contact Form Submission from Test User');
    expect(body.html).toContain('Test User');
    expect(body.html).toContain('test@example.com');
    expect(jest.getTimerCount()).toBe(0);
    const logs = `${loggedText(logSpy)} ${loggedText(errorSpy)}`;
    expect(logs).not.toContain('test-resend-key');
    expect(logs).not.toContain('email_123');
    expect(logs).not.toContain(payload.projectDetails);
  });

  it('reports provider and network failures without logging the body or enquiry', async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse(
        { message: 'provider-secret-body', id: 'email_should_not_count' },
        false,
        422
      )
    );
    expect(await sendContactFormEmail(payload)).toBe(false);

    mockFetch.mockRejectedValueOnce(new Error('network down'));
    expect(await sendContactFormEmail(payload)).toBe(false);

    const logged = loggedText(errorSpy);
    expect(logged).not.toContain('provider-secret-body');
    expect(logged).not.toContain('email_should_not_count');
    expect(logged).not.toContain('network down');
    expect(logged).not.toContain(payload.email);
    expect(logged).not.toContain(payload.projectDetails);
    expect(jest.getTimerCount()).toBe(0);
  });

  it.each([
    ['missing id', {}],
    ['empty id', { id: '' }],
    ['blank id', { id: '   ' }],
    ['non-string id', { id: 12 }],
  ])('rejects a successful response with %s', async (_label, body) => {
    mockFetch.mockResolvedValueOnce(jsonResponse(body));
    expect(await sendContactFormEmail(payload)).toBe(false);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('rejects a successful response whose body is not JSON', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => {
        throw new Error('invalid json');
      },
    });
    expect(await sendContactFormEmail(payload)).toBe(false);
    expect(loggedText(errorSpy)).not.toContain('invalid json');
    expect(jest.getTimerCount()).toBe(0);
  });

  it('bounds response time by aborting the request at 20 seconds', async () => {
    mockFetch.mockImplementation((_url: string, init?: RequestInit) => {
      return new Promise((_resolve, reject) => {
        const signal = init?.signal;
        const abort = () => {
          const error = new Error('The operation was aborted');
          error.name = 'AbortError';
          reject(error);
        };
        if (!signal) return;
        if (signal.aborted) abort();
        else signal.addEventListener('abort', abort);
      });
    });

    const delivery = sendContactFormEmail(payload);
    await jest.advanceTimersByTimeAsync(19999);
    expect(mockFetch.mock.calls[0][1].signal.aborted).toBe(false);
    await jest.advanceTimersByTimeAsync(1);
    expect(await delivery).toBe(false);
    expect(mockFetch.mock.calls[0][1].signal.aborted).toBe(true);
    expect(loggedText(errorSpy)).toContain('Email delivery timed out');
    expect(loggedText(errorSpy)).not.toContain(payload.email);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('escapes user text before inserting it into the HTML message', async () => {
    await sendContactFormEmail({
      ...payload,
      name: '<script>test</script>',
      projectDetails: '<img src=x onerror=alert(1)> & a quotation "here"',
    });
    const message = requestBody();
    expect(message.html).toContain('&lt;script&gt;test&lt;/script&gt;');
    expect(message.html).toContain('&lt;img');
    expect(message.html).not.toContain('<img src=x');
    expect(message.html).toContain('&amp;');
    expect(message.html).toContain('&quot;here&quot;');
    expect(message.reply_to).toBe('test@example.com');
    expect(message.to).toEqual(['admin@mpdee.co.uk']);
  });
});
