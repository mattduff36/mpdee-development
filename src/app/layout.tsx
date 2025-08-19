import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { generateMPDEEMetadata } from '@/shared/seo-utils';
import Script from 'next/script';
import Layout from '@/components/Layout';
import StructuredData from '@/components/StructuredData';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  ...generateMPDEEMetadata({
    title: 'MPDEE Development - Professional Web Design & Development',
    description:
      'Professional web design and development services. Custom websites, e-commerce solutions, and digital platforms that drive results.',
    keywords: [
      'web design',
      'web development',
      'UI/UX design',
      'frontend development',
      'full-stack development',
      'e-commerce solutions',
      'custom websites',
      'digital platforms',
      'responsive design',
      'professional web services',
    ],
    canonicalUrl: '/',
    service: 'development',
  }),
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
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
      <head>
        <StructuredData />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.addEventListener('beforeunload', function() {
                window.scrollTo(0, 0);
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Cross-Domain Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FNQX2LJQQE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-cross-domain" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FNQX2LJQQE', {
              linker: {
                domains: ['mpdee.co.uk', 'creative.mpdee.co.uk', 'development.mpdee.co.uk', 'support.mpdee.co.uk']
              },
              custom_map: {
                'custom_parameter_1': 'service_conversion'
              }
            });
            
            // Track conversions
            function trackConversion(action) {
              gtag('event', 'conversion', {
                'send_to': 'G-FNQX2LJQQE/' + action,
                'service_type': 'development',
                'source_site': 'specialized'
              });
            }
            
            // Track hub referrals
            function trackHubReferral() {
              gtag('event', 'hub_referral', {
                'service_type': 'development',
                'destination': 'hub'
              });
            }
            
            window.trackConversion = trackConversion;
            window.trackHubReferral = trackHubReferral;
          `}
        </Script>

        <Layout>{children}</Layout>
        <Analytics />
      </body>
    </html>
  );
}
