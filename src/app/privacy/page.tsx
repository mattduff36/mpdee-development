import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'How this website handles your enquiry and basic usage information.',
  alternates: { canonical: '/privacy' },
};
export default function Privacy() {
  return (
    <div className="container">
      <header className="page-intro">
        <span className="eyebrow">Your information</span>
        <h1>
          How your data
          <br />
          is <span className="serif-word">handled.</span>
        </h1>
        <p>
          How information is handled when you visit this site or get in touch
          with MPDEE Development.
        </p>
      </header>
      <article className="privacy-copy">
        <h2>Your enquiry</h2>
        <p>
          The contact form asks for your name and email address, with optional
          phone and project details. Your message is sent by email to MPDEE
          Development so Matt can respond and discuss your project. Please avoid
          including passwords or other sensitive information in your message.
        </p>
        <p>
          You can also email{' '}
          <a href="mailto:sendme@mpdee.info">sendme@mpdee.info</a> directly. To
          ask about information you have provided, or request its correction or
          deletion, use the same address.
        </p>
        <h2>Website hosting and analytics</h2>
        <p>
          This website is hosted on Vercel. It uses Vercel Web Analytics for
          aggregated usage information such as page views, device type and
          referral sources. The analytics integration does not use third-party
          cookies. Contact form fields are not included in analytics events.
        </p>
        <p>
          For details of the provider’s processing, see{' '}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noreferrer"
          >
            Vercel’s analytics privacy information (opens in a new tab)
          </a>{' '}
          and{' '}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noreferrer"
          >
            Vercel’s privacy policy (opens in a new tab)
          </a>
          .
        </p>
        <h2>External websites</h2>
        <p>
          Project links open websites operated by their respective owners. Their
          privacy notices and settings apply when you visit them.
        </p>
        <h2>Questions?</h2>
        <p>
          Contact Matt at{' '}
          <a href="mailto:sendme@mpdee.info">sendme@mpdee.info</a> if you have a
          question about this website or your enquiry.
        </p>
      </article>
    </div>
  );
}
