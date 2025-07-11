require('@testing-library/jest-dom');

// Mock Vercel Analytics
jest.mock('@vercel/analytics', () => ({
  track: jest.fn(),
  Analytics: () => null,
}));
