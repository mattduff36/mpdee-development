import Link from 'next/link';
import { Arrow, BrandMark } from './Marks';
export function ContactCta() {
  return (
    <section className="contact-cta" aria-labelledby="cta-title">
      <div className="container cta-inner">
        <div>
          <span className="eyebrow">Project enquiry</span>
          <h2 id="cta-title">
            Tell me about
            <br />
            your <span>project.</span>
          </h2>
          <p>
            A new website, a web application, or a change to something you
            already have.
          </p>
          <Link href="/contact" className="button button-dark">
            Send an enquiry <Arrow />
          </Link>
        </div>
        <div className="cta-mark" aria-hidden="true">
          <BrandMark />
          <span>
            SEND A
            <br />
            PROJECT
            <br />
            ENQUIRY.
          </span>
        </div>
      </div>
    </section>
  );
}
