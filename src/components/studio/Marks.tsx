export function Arrow({
  diagonal = true,
  className = '',
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={'arrow-icon ' + className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-7-7 7 7-7 7'}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
const BRAND_MARK_SRC = '/images/MPDEE-Development-logo-trans.png';
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className ? 'brand-mark ' + className : 'brand-mark'}
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <image
        href={BRAND_MARK_SRC}
        xlinkHref={BRAND_MARK_SRC}
        width="72"
        height="72"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}
export function Asterisk({ className = '' }: { className?: string }) {
  return <BrandMark className={className} />;
}
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span className="section-number">{number}</span>
      <span>{children}</span>
    </div>
  );
}
