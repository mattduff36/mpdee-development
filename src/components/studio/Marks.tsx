import { useId } from 'react';
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
export function Asterisk({ className = '' }: { className?: string }) {
  const maskId = `mpdee-mark-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <svg
      className={className || undefined}
      width="72"
      height="72"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <mask
        id={maskId}
        maskUnits="userSpaceOnUse"
        maskContentUnits="userSpaceOnUse"
        style={{ maskType: 'alpha' }}
        {...{ 'mask-type': 'alpha' }}
      >
        <image
          href={BRAND_MARK_SRC}
          xlinkHref={BRAND_MARK_SRC}
          x="0"
          y="0"
          width="80"
          height="80"
          preserveAspectRatio="xMidYMid meet"
        />
      </mask>
      <rect
        width="80"
        height="80"
        fill="currentColor"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
export function BrandMark({ className = '' }: { className?: string }) {
  return <Asterisk className={className} />;
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
