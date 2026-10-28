import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

const manrope = localFont({
  src: '../../public/fonts/Manrope.ttf',
  variable: '--font-manrope',
  display: 'swap',
  weight: '200 800',
});
export const metadata: Metadata = {
  metadataBase: new URL('https://development.mpdee.co.uk'),
  title: {
    default: 'MPDEE Development — Big ideas. Beautifully built.',
    template: '%s | MPDEE Development',
  },
  description:
    'Distinctive websites and useful web applications, designed and developed by Matt at MPDEE. Based in Edwinstowe, Nottinghamshire. Built around your business.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'MPDEE Development',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'MPDEE Development — Big ideas. Beautifully built.',
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: '/images/favicon/favicon.ico',
    apple: '/images/favicon/apple-touch-icon.png',
  },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f7f6f2',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={manrope.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
