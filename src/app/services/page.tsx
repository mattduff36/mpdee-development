import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow, Asterisk, SectionLabel } from '@/components/studio/Marks';
import { ContactCta } from '@/components/studio/ContactCta';
import { capabilities, faqs, websitePackages } from '@/data/services';

export const metadata: Metadata = {
  title: 'Websites, web apps & ongoing care',
  description:
    'Thoughtful websites, useful web apps and practical improvements from MPDEE Development. Explore services and website packages, starting at £100.',
  alternates: { canonical: '/services' },
};

const serviceQueries = {
  websites: 'website',
  platforms: 'platform',
  improvements: 'improvements',
};

export default function Services() {
  return (
    <>
      <div className="container">
        <section className="page-intro">
          <SectionLabel number="02">WHAT I DO</SectionLabel>
          <h1>
            Made for your
            <br />
            next <em>chapter.</em>
          </h1>
          <p>
            A first website. A more useful platform. A better version of what
            you already have. Good design and thoughtful development, built
            around you.
          </p>
        </section>
        <div className="services-list">
          {capabilities.map(capability => (
            <section
              key={capability.id}
              id={capability.id}
              className={`service-detail service-detail-${capability.id}`}
              aria-labelledby={`${capability.id}-title`}
            >
              <div className="service-detail-copy">
                {capability.id === 'platforms' && (
                  <span
                    id="pwa-webapps"
                    className="anchor-target"
                    aria-hidden="true"
                  />
                )}
                <span className="service-number">
                  {capability.number} / {capability.shortTitle}
                </span>
                <h2 id={`${capability.id}-title`}>{capability.title}</h2>
                <p>{capability.detail}</p>
                <ul className="service-includes">
                  {capability.includes.map(item => (
                    <li key={item}>
                      <span aria-hidden="true">↗</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?service=${serviceQueries[capability.id]}`}
                  className="text-link"
                >
                  Let’s talk about it <Arrow />
                </Link>
              </div>
              <div
                className={`service-visual service-visual-${capability.id}`}
                aria-hidden="true"
              >
                {capability.id === 'websites' ? (
                  <div className="service-browser">
                    <div className="service-browser-bar">
                      <span />
                      <span />
                      <span />
                      <i>your next chapter</i>
                    </div>
                    <div className="service-browser-content">
                      <span>YOUR BUSINESS. YOUR WAY.</span>
                      <strong>
                        A little
                        <br />
                        more <em>you.</em>
                      </strong>
                      <div className="service-browser-footer">
                        <b>LET’S GET STARTED ↗</b>
                        <Asterisk />
                      </div>
                    </div>
                  </div>
                ) : capability.id === 'platforms' ? (
                  <div className="service-platform">
                    <div className="platform-core">
                      <Asterisk />
                      <span>YOUR IDEA</span>
                    </div>
                    <span className="platform-node node-one">People</span>
                    <span className="platform-node node-two">Bookings</span>
                    <span className="platform-node node-three">Payments</span>
                    <span className="platform-node node-four">
                      Possibilities
                    </span>
                  </div>
                ) : (
                  <div className="service-improvements">
                    <span>SMALL CHANGES. REAL DIFFERENCE.</span>
                    <div className="improvement-lines">
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <strong>
                      Better,
                      <br />
                      by design.
                    </strong>
                    <Arrow />
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
        <section className="section" aria-labelledby="packages-title">
          <div className="section-heading">
            <div>
              <SectionLabel number="03">A PLACE TO START</SectionLabel>
              <h2 id="packages-title">
                Clear starting points.
                <br />
                Room for your ideas.
              </h2>
            </div>
            <p>
              Every business is different. These website packages give you a
              starting point for the conversation.
            </p>
          </div>
          <div className="package-grid">
            {websitePackages.map(pkg => (
              <article key={pkg.id} id={pkg.id} className="package-card">
                <h3>{pkg.title}</h3>
                <p className="package-price">
                  <span>From</span> £{pkg.price}
                </p>
                <p>{pkg.description}</p>
                <Link href={`/contact?service=${pkg.id}`} className="text-link">
                  Discuss {pkg.title.replace(' Package', '').toLowerCase()}{' '}
                  <Arrow />
                </Link>
              </article>
            ))}
          </div>
          <p className="package-note">
            Final scope, hosting and support are agreed before work begins.
            Custom web apps and platforms are quoted individually.
          </p>
        </section>
        <section className="faq-section section" aria-labelledby="faq-title">
          <div className="section-heading">
            <div>
              <SectionLabel number="04">A FEW GOOD QUESTIONS</SectionLabel>
              <h2 id="faq-title">
                Before we
                <br />
                say hello.
              </h2>
            </div>
            <p>
              Something else on your mind?{' '}
              <Link href="/contact">Just ask.</Link>
            </p>
          </div>
          <div className="faq-list">
            {faqs.map(faq => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <aside id="gmc-media-partnership" className="service-related">
          <p>
            Looking for creative production or practical IT support too? Explore
            the wider MPDEE family.
          </p>
          <div>
            <a href="https://creative.mpdee.co.uk" className="text-link">
              MPDEE Creative <Arrow />
            </a>
            <a href="https://support.mpdee.co.uk" className="text-link">
              MPDEE Support <Arrow />
            </a>
          </div>
        </aside>
      </div>
      <ContactCta />
    </>
  );
}
