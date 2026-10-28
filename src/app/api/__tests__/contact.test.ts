/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { POST } from '../contact/route';

// All email delivery is mocked. These tests never contact SMTP.
const mockSendContactFormEmail = jest.fn();
const mockCheckRateLimit = jest.fn();
jest.mock('@/utils/email', () => ({
  sendContactFormEmail: (...args: unknown[]) =>
    mockSendContactFormEmail(...args),
}));
jest.mock('@/utils/rate-limit', () => ({
  checkRateLimit: (...args: unknown[]) => mockCheckRateLimit(...args),
}));

function createRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const payload = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '07123 456789',
  projectDetails: 'A new business website',
};

describe('POST /api/contact', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
    mockSendContactFormEmail.mockReset().mockResolvedValue(true);
    mockCheckRateLimit.mockReset().mockReturnValue({ allowed: true });
  });

  afterEach(() => jest.restoreAllMocks());

  it.each([
    [{ email: 'a@b.com' }, /Name/],
    [{ name: 'Test' }, /Email/],
    [{ ...payload, email: 'invalid' }, /valid email/i],
    [{ ...payload, name: 'a'.repeat(101) }, /100 characters/],
    [{ ...payload, email: `${'a'.repeat(250)}@example.com` }, /valid email/],
    [{ ...payload, phone: '123' }, /valid phone/],
    [{ ...payload, phone: { number: '07123456789' } }, /valid phone/],
    [{ ...payload, projectDetails: 'a'.repeat(1001) }, /1000 characters/],
    [{ ...payload, projectDetails: ['unexpected'] }, /must be text/],
    [null, /JSON object/],
    [[], /JSON object/],
  ])(
    'rejects invalid payload without attempting delivery',
    async (body, expectedError) => {
      const res = await POST(createRequest(body));
      expect(res.status).toBe(400);
      expect((await res.json()).error).toMatch(expectedError);
      expect(mockSendContactFormEmail).not.toHaveBeenCalled();
    }
  );

  it('returns 400 for invalid JSON', async () => {
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid json',
    });
    expect((await POST(req)).status).toBe(400);
    expect(mockSendContactFormEmail).not.toHaveBeenCalled();
  });

  it('accepts UK domestic numbers and trims valid input before delivery', async () => {
    const res = await POST(
      createRequest({
        ...payload,
        name: `  ${payload.name}  `,
        email: `  ${payload.email}  `,
      })
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: 'Message sent successfully!' });
    expect(mockSendContactFormEmail).toHaveBeenCalledTimes(1);
    expect(mockSendContactFormEmail).toHaveBeenCalledWith(payload);
  });

  it('accepts details at the maximum and omitted optional fields', async () => {
    const res = await POST(
      createRequest({
        name: 'Test',
        email: 'test@example.com',
        projectDetails: 'a'.repeat(1000),
      })
    );
    expect(res.status).toBe(200);
    expect(mockSendContactFormEmail).toHaveBeenCalledWith({
      name: 'Test',
      email: 'test@example.com',
      phone: '',
      projectDetails: 'a'.repeat(1000),
    });
  });

  it('returns an honest failure and direct contact fallback if SMTP cannot send', async () => {
    mockSendContactFormEmail.mockResolvedValue(false);
    const res = await POST(createRequest(payload));
    expect(res.status).toBe(503);
    expect((await res.json()).error).toContain('sendme@mpdee.info');
  });

  it('handles unexpected delivery errors without reporting success', async () => {
    mockSendContactFormEmail.mockRejectedValue(new Error('Transport failure'));
    const res = await POST(createRequest(payload));
    expect(res.status).toBe(503);
    expect((await res.json()).error).toContain('could not be sent');
  });

  it('preserves rate limiting and retry-after before processing the message', async () => {
    mockCheckRateLimit.mockReturnValue({ allowed: false, retryAfter: 37 });
    const res = await POST(createRequest(payload));
    expect(res.status).toBe(429);
    expect(res.headers.get('Retry-After')).toBe('37');
    expect(mockSendContactFormEmail).not.toHaveBeenCalled();
  });
});
