import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Layout from '@/components/Layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MPDEE - Professional Web Design & Development',
  description:
    'Professional web design and development services. We create beautiful, functional websites that drive results.',
  keywords: 'web design, web development, UI/UX, frontend, full-stack',
  authors: [{ name: 'MPDEE' }],
  robots: 'index, follow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
        <Analytics />
      </body>
    </html>
  );
}
