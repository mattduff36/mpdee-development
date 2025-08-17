require('@testing-library/jest-dom');

// Mock Vercel Analytics
jest.mock('@vercel/analytics', () => ({
  track: jest.fn(),
  Analytics: () => null,
}));

// Polyfill fetch for Jest (jsdom does not provide fetch by default)
if (!global.fetch) {
  global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
}
