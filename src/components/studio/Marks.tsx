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
export function Asterisk({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="72"
      height="72"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M40 4v72M4 40h72M14.5 14.5l51 51m0-51-51 51"
        stroke="currentColor"
        strokeWidth="12"
      />
    </svg>
  );
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
