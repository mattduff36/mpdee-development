/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  // Ensure proper handling of environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Configure for Vercel deployment
  serverExternalPackages: ['nodemailer'],
  // Handle trailing slashes for better routing
  trailingSlash: false,
  // Ensure proper static generation
  output: 'standalone',
};

module.exports = nextConfig;
