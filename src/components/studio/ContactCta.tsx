import Link from 'next/link';
import { Arrow, Asterisk } from './Marks';
export function ContactCta() {
  return (
    <section className="contact-cta" aria-labelledby="cta-title">
      <div className="container cta-inner">
        <div>
          <span className="eyebrow">Something on your mind?</span>
          <h2 id="cta-title">
            Let’s make
            <br />
            something <span>great.</span>
          </h2>
          <p>
            A new website. A better way of working. That idea you keep coming
            back to.
          </p>
          <Link href="/contact" className="button button-dark">
            Tell me about it <Arrow />
          </Link>
        </div>
        <div className="cta-mark" aria-hidden="true">
          <Asterisk />
          <span>
            YOUR NEXT
            <br />
            CHAPTER STARTS
            <br />
            WITH A HELLO.
          </span>
        </div>
      </div>
    </section>
  );
}
