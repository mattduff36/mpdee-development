import Link from 'next/link';
import { Arrow } from './studio/Marks';
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link href="/" className="footer-brand">
              mpdee<span>.</span>
            </Link>
            <p>
              Good people. Thoughtful design.
              <br />
              Things that work beautifully.
            </p>
          </div>
          <div className="footer-links">
            <span className="eyebrow">Explore</span>
            <Link href="/work">The work</Link>
            <Link href="/services">What I do</Link>
            <Link href="/#studio">The studio</Link>
            <Link href="/contact">Start a project</Link>
          </div>
          <div className="footer-links">
            <span className="eyebrow">Say hello</span>
            <a href="mailto:sendme@mpdee.info">
              sendme@mpdee.info <Arrow />
            </a>
            <span className="footer-location">
              Edwinstowe, Nottinghamshire
              <br />
              Working with businesses everywhere.
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MPDEE Development</span>
          <div>
            <span>Part of the MPDEE family</span>
            <a
              href="https://creative.mpdee.co.uk/"
              target="_blank"
              rel="noreferrer"
            >
              Creative <Arrow />
            </a>
            <a
              href="https://support.mpdee.co.uk/"
              target="_blank"
              rel="noreferrer"
            >
              Support <Arrow />
            </a>
          </div>
          <Link href="/privacy">Privacy</Link>
          <a href="#main-content">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
