import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { Arrow, Asterisk, SectionLabel } from '@/components/studio/Marks';

export const metadata: Metadata = {
  title: 'Project enquiry',
  description:
    'Tell Matt about your next website, web app or improvement. Speak directly with MPDEE Development in Edwinstowe, Nottinghamshire.',
  alternates: { canonical: '/contact' },
};

const interests: Record<string, string> = {
  website: 'a new website',
  websites: 'a new website',
  platform: 'a web app or platform',
  platforms: 'a web app or platform',
  improvements: 'improving my existing website',
  'starter-website': 'the Starter Package',
  'basic-website': 'the Basic Package',
  'pro-website': 'the Pro Package',
  'ultimate-website': 'the Ultimate Package',
  'pwa-webapps': 'a web app',
};

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const params = await searchParams;
  const service =
    typeof params.service === 'string' ? params.service : undefined;
  const initialInterest =
    service && Object.prototype.hasOwnProperty.call(interests, service)
      ? interests[service]
      : undefined;

  return (
    <div className="container">
      <section className="page-intro">
        <SectionLabel number="04">CONTACT</SectionLabel>
        <h1>
          Tell me about
          <br />
          your <em>project.</em>
        </h1>
        <p>
          A new website, a web application, or a change to a site you already
          have. A short note is enough to start the conversation.
        </p>
      </section>
      <section className="contact-layout" aria-label="Get in touch with Matt">
        <div className="contact-copy">
          <Asterisk className="contact-asterisk" />
          <h2>
            Working directly
            <br />
            with Matt.
          </h2>
          <p>
            You’ll speak with Matt — the person who’ll design and build your
            project. No need for a polished brief. We can work that out
            together.
          </p>
          <div className="contact-detail">
            <span className="eyebrow">PREFER EMAIL?</span>
            <a href="mailto:sendme@mpdee.info" className="text-link">
              sendme@mpdee.info <Arrow />
            </a>
          </div>
          <div className="contact-detail">
            <span className="eyebrow">BASED IN</span>
            <p>
              Edwinstowe, Nottinghamshire.
              <br />
              Clients may be local or further afield.
            </p>
          </div>
          <div className="contact-next">
            <h3>What happens next</h3>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <strong>Tell me a little about it.</strong>
                  <p>
                    An idea, a link or a challenge is a good starting point.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>We’ll work out what you need.</strong>
                  <p>
                    A straightforward conversation about the right approach.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>A clear plan before we start.</strong>
                  <p>Scope, costs and next steps, agreed together.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
        <div className="contact-panel">
          <span className="eyebrow">PROJECT ENQUIRY</span>
          <h2>Your enquiry</h2>
          <p>
            Add your name, email and a short note about the website, application
            or change.
          </p>
          <ContactForm initialInterest={initialInterest} />
        </div>
      </section>
    </div>
  );
}
