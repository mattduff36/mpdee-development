# Cursor Website

A professional web design and development services website built with Next.js, TypeScript, and TailwindCSS.

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles with TailwindCSS
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Homepage
├── components/         # Reusable React components
│   ├── index.ts        # Component exports
│   └── Layout.tsx      # Main layout wrapper
├── pages/              # Additional pages (if needed)
├── types/              # TypeScript type definitions
│   └── index.ts        # Main types file
└── utils/              # Utility functions
    ├── email.ts        # Email notification utilities
    └── validation.ts   # Form validation utilities
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your actual email service credentials.

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

The following environment variables are required for email functionality:

- `EMAIL_SERVICE` - Email service provider ('sendgrid', 'smtp', etc.)
- `CONTACT_EMAIL` - Email address to receive contact form submissions
- `NEXT_PUBLIC_SITE_URL` - Your site URL (for email templates)

### SendGrid Configuration
- `SENDGRID_API_KEY` - Your SendGrid API key
- `SENDGRID_FROM_EMAIL` - From email address for SendGrid

### SMTP Configuration
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `SMTP_FROM` - From email address for SMTP

See `env.example` for a complete list with example values.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate-favicons` - Generate favicon assets

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## Deployment (Vercel)

This project is ready for deployment on [Vercel](https://vercel.com/):

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com/) and import your repository.
3. Vercel will auto-detect Next.js and deploy your site.
4. For custom configuration, see `vercel.json` in the project root.

No additional configuration is required for a standard Next.js app.
