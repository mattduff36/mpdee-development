/**
 * @jest-environment node
 */
/** Integration tests for contact API route. Email util is mocked - no actual emails sent. */
import { NextRequest } from 'next/server';
import { POST } from '../contact/route';

const mockSendContactFormEmail = jest.fn();
jest.mock('@/utils/email', () => ({
  sendContactFormEmail: (...args: unknown[]) =>
    mockSendContactFormEmail(...args),
}));

jest.mock('@/utils/rate-limit', () => ({
  checkRateLimit: () => ({ allowed: true }),
}));

function createRequest(body: object): NextRequest {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    mockSendContactFormEmail.mockReset();
    mockSendContactFormEmail.mockResolvedValue(true);
  });

  it('returns 400 for missing name', async () => {
    const res = await POST(createRequest({ email: 'a@b.com' }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('Name');
  });

  it('returns 400 for missing email', async () => {
    const res = await POST(createRequest({ name: 'Test' }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('Email');
  });

  it('returns 400 for invalid email', async () => {
    const res = await POST(createRequest({ name: 'Test', email: 'invalid' }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/valid email/i);
  });

  it('returns 400 for invalid JSON', async () => {
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid json',
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns 200 and sends email for valid payload', async () => {
    const res = await POST(
      createRequest({
        name: 'Test User',
        email: 'test@example.com',
        projectDetails: 'Hello',
      })
    );
    expect(res.status).toBe(200);
    expect(mockSendContactFormEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test User',
        email: 'test@example.com',
        projectDetails: 'Hello',
      })
    );
  });
});
