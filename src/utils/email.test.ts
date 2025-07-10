import { sendContactFormEmail } from './email';

// Mock console methods to avoid cluttering test output
const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

describe('email utils', () => {
  beforeEach(() => {
    // Clear console mocks before each test
    consoleSpy.mockClear();
    consoleWarnSpy.mockClear();
  });

  afterAll(() => {
    // Restore console methods after all tests
    consoleSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('sends contact form email successfully', async () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      projectDetails: 'I need a website built',
    };

    const result = await sendContactFormEmail(formData);
    expect(result).toBe(true);
  });

  it('handles missing optional fields', async () => {
    const formData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
    };

    const result = await sendContactFormEmail(formData);
    expect(result).toBe(true);
  });

  it('logs email service and content during development', async () => {
    const formData = {
      name: 'Test User',
      email: 'test@example.com',
    };

    await sendContactFormEmail(formData);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Email service:',
      expect.any(String)
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      'Email content:',
      expect.any(Object)
    );
  });
}); 