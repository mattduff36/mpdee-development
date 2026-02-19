import { sendContactFormEmail } from './email';

const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

describe('email utils', () => {
  beforeEach(() => {
    consoleErrorSpy.mockClear();
    consoleLogSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it('returns false when SMTP is not configured in dev', async () => {
    const originalEnv = process.env.NODE_ENV;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.CONTACT_EMAIL;
    process.env.NODE_ENV = 'test';

    const result = await sendContactFormEmail({
      name: 'John Doe',
      email: 'john@example.com',
    });

    expect(result).toBe(false);
    process.env.NODE_ENV = originalEnv;
  });

  it('handles missing optional fields', async () => {
    const result = await sendContactFormEmail({
      name: 'Jane Doe',
      email: 'jane@example.com',
    });

    expect(typeof result).toBe('boolean');
  });
});
