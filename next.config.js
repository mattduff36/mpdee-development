/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;
