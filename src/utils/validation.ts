export const CONTACT_FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  projectDetails: 1000,
} as const;

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.length <= CONTACT_FIELD_LIMITS.email && emailRegex.test(email);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validatePhone = (phone: string): boolean => {
  if (!phone.trim()) return true;
  if (phone.length > CONTACT_FIELD_LIMITS.phone) return false;

  // Accept familiar domestic and international formatting without silently
  // discarding letters or extension numbers from an invalid number.
  if (!/^\+?[\d\s()-]+$/.test(phone.trim())) return false;
  const digits = phone.replace(/[\s()-]/g, '');
  if (!/^\+?\d{7,15}$/.test(digits) || !/[1-9]/.test(digits)) return false;
  return !digits.startsWith('+0');
};
