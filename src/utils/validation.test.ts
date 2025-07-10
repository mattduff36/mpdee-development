import { validateEmail, validateRequired, validatePhone } from './validation';

describe('validation utils', () => {
  it('validates email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });

  it('validates required fields', () => {
    expect(validateRequired('hello')).toBe(true);
    expect(validateRequired('   ')).toBe(false);
  });

  it('validates phone numbers', () => {
    expect(validatePhone('+1234567890')).toBe(true);
    expect(validatePhone('')).toBe(true); // optional
    expect(validatePhone('invalid')).toBe(false);
  });
}); 