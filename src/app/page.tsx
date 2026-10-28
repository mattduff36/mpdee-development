import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Arrow, Asterisk, SectionLabel } from '@/components/studio/Marks';
import { ContactCta } from '@/components/studio/ContactCta';
import { ProjectCard } from '@/components/studio/ProjectCard';
import { projects } from '@/data/projects';
import { capabilities } from '@/data/services';
export const metadata: Metadata = { alternates: { canonical: '/' } };
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'MPDEE Development',
            url: 'https://development.mpdee.co.uk',
            email: 'sendme@mpdee.info',
            description: 'Web design and web application development.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Edwinstowe',
              addressRegion: 'Nottinghamshire',
              addressCountry: 'GB',
            },
          }),
        }}
      />
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="status-dot" /> Independent design & development
          </div>
          <h1 id="hero-title">
            Big ideas.
            <br />
            Beautifully
            <br />
            <span className="marker-word">
              built.
              <svg viewBox="0 0 340 24" aria-hidden="true">
                <path
                  d="M5 16Q120 1 332 10M12 21Q150 12 312 19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="hero-description">
            I design and build websites and web applications for businesses that
            need something clear, useful and well made.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/contact">
              Start a project <Arrow />
            </Link>
            <Link className="text-link" href="#selected-work">
              See the work <Arrow diagonal={false} />
            </Link>
          </div>
          <div className="hero-note">
            <span className="tiny-cross">+</span>
            Designed and built by Matt in Nottinghamshire.
          </div>
        </div>
        <div
          className="hero-art"
          aria-label="A selection of websites built by MPDEE Development"
        >
          <div className="art-grid" />
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="hero-disc">
            <div className="disc-ring" />
            <span className="disc-cross">+</span>
          </div>
          <div className="hero-window window-back">
            <div className="browser-bar">
              <span />
              <span />
              <span />
              <small>voiceoverstudiofinder.com</small>
            </div>
            <Image
              src="/images/work/voiceover-2026.jpg"
              alt="Voiceover Studio Finder website"
              width={1348}
              height={926}
              sizes="(max-width: 700px) 70vw, 36vw"
              priority
            />
          </div>
          <div className="hero-window window-front">
            <div className="browser-bar">
              <span />
              <span />
              <span />
              <small>leebarrowcliffphotography.com</small>
            </div>
            <Image
              src="/images/portfolio-images/Lee-Barrowcliff-Photography/lbp-1.png"
              alt="Lee Barrowcliff Photography website"
              width={963}
              height={626}
              sizes="(max-width: 700px) 65vw, 30vw"
              priority
            />
          </div>
          <div className="craft-stamp">
            <Asterisk />
            <span>
              BASIC
              <br />
              PACKAGE
              <br />
              FROM £350
            </span>
          </div>
          <span className="art-coordinate" aria-hidden="true">
            NOTTINGHAMSHIRE
          </span>
        </div>
      </section>
      <div className="client-strip container">
        <span className="eyebrow">
          A selection
          <br />
          of projects
        </span>
        <div className="client-names">
          <span className="client-itrader">
            iTrader<span>.im</span>
          </span>
          <span className="client-voice">
            VOICEOVER
            <br />
            <strong>STUDIO FINDER</strong>
          </span>
          <span className="client-victoria">
            Victoria Rose<span>HAIR & BEAUTY</span>
          </span>
          <span className="client-lee">
            LEE BARROWCLIFF<span>PHOTOGRAPHY</span>
          </span>
        </div>
      </div>
      <section
        id="selected-work"
        className="section container work-section"
        aria-labelledby="work-heading"
      >
        <SectionLabel number="01">Selected work</SectionLabel>
        <div className="section-heading">
          <h2 id="work-heading">
            Recent websites
            <br />
            <span className="muted">and web applications.</span>
          </h2>
          <Link className="text-link" href="/work">
            View all projects <Arrow />
          </Link>
        </div>
        <div className="project-grid">
          {projects.slice(0, 4).map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
      <section
        className="capabilities-section"
        aria-labelledby="services-heading"
      >
        <div className="container">
          <SectionLabel number="02">What I can help with</SectionLabel>
          <div className="section-heading">
            <h2 id="services-heading">
              Website design, web apps
              <br />
              <span className="muted-light">and improvements.</span>
            </h2>
            <p>
              The work covers a new website, a custom web application, or
              changes to a site you already have.
            </p>
          </div>
          <div className="capability-list">
            {capabilities.map(service => (
              <Link
                href={'/services#' + service.id}
                className="capability-row"
                key={service.id}
              >
                <span className="capability-number">{service.number}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="tag-list">
                    {service.tags.map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="capability-arrow">
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section
        id="studio"
        className="section container studio-section"
        aria-labelledby="studio-heading"
      >
        <div className="studio-art" aria-hidden="true">
          <span className="eyebrow">Design and development</span>
          <div className="studio-monogram">
            m<span>.</span>
          </div>
          <div className="studio-signoff">
            <span>Matt @ MPDEE</span>
            <Asterisk />
          </div>
          <div className="studio-art-foot">
            <span>BASED IN NOTTINGHAMSHIRE</span>
            <span>EDWINSTOWE</span>
          </div>
        </div>
        <div className="studio-copy">
          <SectionLabel number="03">About</SectionLabel>
          <h2 id="studio-heading">
            Hello, I’m Matt.
            <br />
            I’m based in
            <br />
            <span className="serif-word">Edwinstowe.</span>
          </h2>
          <p>
            I’m the developer behind MPDEE. I bring design, code and a practical
            understanding of technology together to make things that look right
            and work properly.
          </p>
          <p>
            You work directly with the person building your project. That means
            honest advice, a clear conversation, and someone who cares about the
            little things as much as you do.
          </p>
          <Link href="/contact" className="text-link">
            Tell me about your project <Arrow />
          </Link>
        </div>
      </section>
      <section
        className="process-section container"
        aria-labelledby="process-heading"
      >
        <SectionLabel number="04">How a project runs</SectionLabel>
        <div className="section-heading">
          <h2 id="process-heading">
            From a conversation
            <br />
            to a live site.
          </h2>
          <p>
            You do not need a finished brief. We start from what you want the
            website or application to do.
          </p>
        </div>
        <ol className="process-grid">
          <li>
            <span>01 / Agree the scope</span>
            <h3>Understand the work.</h3>
            <p>
              We talk about your business, your people and the problem you want
              to solve. Then agree a clear direction and scope.
            </p>
          </li>
          <li>
            <span>02 / Design and build</span>
            <h3>Design and build.</h3>
            <p>
              You see the work as it takes shape, and we adjust the details from
              your feedback.
            </p>
          </li>
          <li>
            <span>03 / Launch</span>
            <h3>Launch.</h3>
            <p>
              We check the site, put it live, and agree any support that is
              actually needed afterwards.
            </p>
          </li>
        </ol>
      </section>
      <ContactCta />
    </>
  );
}
