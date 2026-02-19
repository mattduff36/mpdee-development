import { validateEmail, validateRequired, validatePhone } from './validation';

describe('validateEmail', () => {
  it('accepts valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('not-an-email')).toBe(false);
    expect(validateEmail('@no-user.com')).toBe(false);
  });
});

describe('validateRequired', () => {
  it('accepts non-empty strings', () => {
    expect(validateRequired('hello')).toBe(true);
  });

  it('rejects empty or whitespace strings', () => {
    expect(validateRequired('')).toBe(false);
    expect(validateRequired('   ')).toBe(false);
  });
});

describe('validatePhone', () => {
  it('accepts valid phone numbers', () => {
    expect(validatePhone('+447123456789')).toBe(true);
  });

  it('accepts empty phone (optional field)', () => {
    expect(validatePhone('')).toBe(true);
  });
});
