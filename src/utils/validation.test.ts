import { validateEmail, validateRequired, validatePhone } from './validation';

describe('validateEmail', () => {
  it.each(['test@example.com', 'user.name@domain.co.uk'])('accepts %s', email =>
    expect(validateEmail(email)).toBe(true)
  );

  it.each([
    '',
    'not-an-email',
    '@no-user.com',
    'test@domain',
    'a\nb@example.com',
    `${'a'.repeat(250)}@example.com`,
  ])('rejects malformed or oversized email %s', email =>
    expect(validateEmail(email)).toBe(false)
  );
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
  it.each([
    '07123 456789',
    '01623 123456',
    '(01623) 123-456',
    '+447123456789',
    '+44 7123 456789',
    '+1 (212) 555-0123',
    '0044 7123 456789',
  ])('accepts domestic and international formatting: %s', phone => {
    expect(validatePhone(phone)).toBe(true);
  });

  it.each(['', '   '])('accepts an omitted optional phone field', phone => {
    expect(validatePhone(phone)).toBe(true);
  });

  it.each([
    '123',
    '0000000',
    '+0123456789',
    '07123CALLME',
    '07123 456789 ext 2',
    '++447123456789',
    '44+7123456789',
    '1234567890123456',
    `07123${' '.repeat(40)}456789`,
  ])('rejects implausible phone input: %s', phone => {
    expect(validatePhone(phone)).toBe(false);
  });
});
