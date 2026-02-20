require('@testing-library/jest-dom');

// Mock Vercel Analytics
jest.mock('@vercel/analytics', () => ({
  track: jest.fn(),
  Analytics: () => null,
}));

// Mock next/font
jest.mock('next/font/google', () => ({
  Geist: () => ({ variable: '--font-test', className: '' }),
  Geist_Mono: () => ({ variable: '--font-mono-test', className: '' }),
}));
