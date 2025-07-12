# MPDEE - Professional Web Design & Development

A modern, responsive website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Contact Form**: Functional contact form with Gmail SMTP integration
- **Portfolio Showcase**: Dynamic project gallery with modal views
- **Service Listings**: Detailed service offerings with interactive cards
- **Performance Optimized**: Fast loading with Next.js optimizations

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Email**: Nodemailer with Gmail SMTP
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Gmail account for contact form

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mpdee.git
cd mpdee
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Configure your Gmail SMTP settings in `.env.local`:
```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_EMAIL=your-email@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Run the development server:
```bash
npm run dev
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard:
   - `SMTP_USER`: Your Gmail address
   - `SMTP_PASS`: Your Gmail App Password
   - `CONTACT_EMAIL`: Where to receive contact form emails
   - `NEXT_PUBLIC_SITE_URL`: Your production domain

3. Deploy automatically on push to main branch

### Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings → Security → App passwords
3. Generate an app password for "Mail"
4. Use this 16-character password in your environment variables

## Contact Form

The contact form uses Gmail SMTP to send emails. Features include:

- Client-side and server-side validation
- Rate limiting and timeout protection
- HTML email formatting
- Reply-to functionality
- Error handling for production

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.
