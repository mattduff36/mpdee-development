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
            Websites and
            <br />
            web <em>apps.</em>
          </h1>
          <p>
            I design and build websites, web applications, and practical
            improvements to sites you already have. Structure, content and
            design follow what your visitors need to do.
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
                  Discuss this service <Arrow />
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
                      <i>sample website</i>
                    </div>
                    <div className="service-browser-content">
                      <span>PAGES, CONTENT, CONTACT</span>
                      <strong>
                        A clear
                        <br />
                        <em>site.</em>
                      </strong>
                      <div className="service-browser-footer">
                        <b>GET IN TOUCH ↗</b>
                        <Asterisk />
                      </div>
                    </div>
                  </div>
                ) : capability.id === 'platforms' ? (
                  <div className="service-platform">
                    <div className="platform-core">
                      <Asterisk />
                      <span>A WEB APP</span>
                    </div>
                    <span className="platform-node node-one">People</span>
                    <span className="platform-node node-two">Bookings</span>
                    <span className="platform-node node-three">Payments</span>
                    <span className="platform-node node-four">Accounts</span>
                  </div>
                ) : (
                  <div className="service-improvements">
                    <span>PRACTICAL IMPROVEMENTS</span>
                    <div className="improvement-lines">
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <strong>
                      Care and
                      <br />
                      updates.
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
              <SectionLabel number="03">WEBSITE PACKAGES</SectionLabel>
              <h2 id="packages-title">
                Website packages
                <br />
                and starting prices.
              </h2>
            </div>
            <p>
              Starter, Basic, Pro and Ultimate are the published starting points
              for a website. Each card shows the from-price.
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
              <SectionLabel number="04">QUESTIONS</SectionLabel>
              <h2 id="faq-title">
                Common
                <br />
                questions.
              </h2>
            </div>
            <p>
              If your question is not listed,{' '}
              <Link href="/contact">use the contact form.</Link>
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
