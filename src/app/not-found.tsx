import Link from 'next/link';
import { Asterisk, Arrow } from '@/components/studio/Marks';
export default function NotFound() {
  return (
    <section className="container page-intro not-found">
      <span className="eyebrow">404 / A little off course</span>
      <h1>
        This page
        <br />
        took a <span className="serif-word">detour.</span>
        <Asterisk />
      </h1>
      <p>
        The link may have changed, or the page might no longer exist. There is
        plenty of good work back this way.
      </p>
      <Link href="/" className="button button-dark">
        Back to the studio <Arrow />
      </Link>
    </section>
  );
}
