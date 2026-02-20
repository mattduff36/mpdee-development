import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css';

import classNames from 'classnames';
import type { ComponentProps } from 'react';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

import { Background, Column, Flex } from '@once-ui-system/core';
import { Footer, Header, Providers } from '@/components';
import { baseURL, fonts, style, effects, home } from '@/resources';

const resolvedBaseURL = baseURL.startsWith('http')
  ? baseURL
  : `https://${baseURL}`;

export const metadata: Metadata = {
  title: {
    default: home.title,
    template: `%s | MPDEE Development`,
  },
  description: home.description,
  metadataBase: new URL(resolvedBaseURL),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: resolvedBaseURL,
    siteName: 'MPDEE Development',
    title: home.title,
    description: home.description,
    images: [
      {
        url: '/images/mpdee_logo_with_text.png',
        width: 1200,
        height: 630,
        alt: 'MPDEE Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: home.title,
    description: home.description,
    images: ['/images/mpdee_logo_with_text.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/favicon/favicon.ico', sizes: 'any' },
      {
        url: '/images/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/images/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/images/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/images/favicon/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const config = ${JSON.stringify({
                    theme: style.theme,
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    'solid-style': style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                  })};
                  const root = document.documentElement;
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  const savedTheme = localStorage.getItem('data-theme');
                  if (savedTheme) {
                    root.setAttribute('data-theme', savedTheme);
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        style={{
          background: 'var(--page-background)',
          margin: 0,
          padding: 0,
        }}
      >
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FNQX2LJQQE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FNQX2LJQQE', {
              linker: {
                domains: ['mpdee.co.uk', 'creative.mpdee.co.uk', 'development.mpdee.co.uk', 'support.mpdee.co.uk']
              }
            });
          `}
        </Script>

        <Providers>
          <Column style={{ minHeight: '100vh' }}>
            <Background
              position="fixed"
              mask={effects.mask}
              gradient={
                effects.gradient as ComponentProps<
                  typeof Background
                >['gradient']
              }
              dots={effects.dots as ComponentProps<typeof Background>['dots']}
              grid={effects.grid as ComponentProps<typeof Background>['grid']}
              lines={
                effects.lines as ComponentProps<typeof Background>['lines']
              }
            />
            <Flex fillWidth minHeight="16" />
            <Header />
            <Flex
              zIndex={0}
              fillWidth
              paddingY="l"
              paddingX="l"
              horizontal="center"
              flex={1}
            >
              <Flex horizontal="center" fillWidth minHeight="0">
                <Column
                  fillWidth
                  paddingX="32"
                  maxWidth="l"
                  horizontal="center"
                  className="layout-content"
                >
                  {children}
                </Column>
              </Flex>
            </Flex>
            <Footer />
          </Column>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
