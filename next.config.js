/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: [],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  serverExternalPackages: ['nodemailer'],
  trailingSlash: false,
  output: 'standalone',
  transpilePackages: ['@once-ui-system/core'],
};

module.exports = withBundleAnalyzer(nextConfig);
