import Link from 'next/link';
import { Asterisk, Arrow } from '@/components/studio/Marks';
export default function NotFound() {
  return (
    <section className="container page-intro not-found">
      <span className="eyebrow">404 / Page not found</span>
      <h1>
        This page
        <br />
        was not <span className="serif-word">found.</span>
        <Asterisk />
      </h1>
      <p>
        The link may have changed, or the page may no longer exist. The homepage
        links to the work, services and contact details.
      </p>
      <Link href="/" className="button button-dark">
        Back to the homepage <Arrow />
      </Link>
    </section>
  );
}
