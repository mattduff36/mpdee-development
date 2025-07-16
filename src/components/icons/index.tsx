// Professional SVG Icons for Services
// Using Heroicons (MIT License) - https://heroicons.com/

import React from 'react';

// Website Package Icons - Shield-style icons for different tiers

// Bronze Shield Icon
export const BronzePackageIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-12 h-12"
    aria-hidden="true"
  >
    <path
      d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"
      fill="#CD7F32"
      stroke="#A0522D"
      strokeWidth="1"
    />
    <path
      d="M12 6L8 8v4c0 2.2 1.8 4 4 4s4-1.8 4-4V8l-4-2z"
      fill="none"
      stroke="#A0522D"
      strokeWidth="1"
    />
  </svg>
);

// Silver Shield Icon
export const SilverPackageIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-12 h-12"
    aria-hidden="true"
  >
    <path
      d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"
      fill="#C0C0C0"
      stroke="#A8A8A8"
      strokeWidth="1"
    />
    <path
      d="M12 6L8 8v4c0 2.2 1.8 4 4 4s4-1.8 4-4V8l-4-2z"
      fill="none"
      stroke="#A8A8A8"
      strokeWidth="1"
    />
  </svg>
);

// Gold Shield Icon
export const GoldPackageIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-12 h-12"
    aria-hidden="true"
  >
    <path
      d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"
      fill="#FFD700"
      stroke="#DAA520"
      strokeWidth="1"
    />
    <path
      d="M12 6L8 8v4c0 2.2 1.8 4 4 4s4-1.8 4-4V8l-4-2z"
      fill="none"
      stroke="#DAA520"
      strokeWidth="1"
    />
  </svg>
);

// Platinum Shield Icon
export const PlatinumPackageIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-12 h-12"
    aria-hidden="true"
  >
    <path
      d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"
      fill="#E5E4E2"
      stroke="#B8B8B8"
      strokeWidth="1"
    />
    <path
      d="M12 6L8 8v4c0 2.2 1.8 4 4 4s4-1.8 4-4V8l-4-2z"
      fill="none"
      stroke="#B8B8B8"
      strokeWidth="1"
    />
    <path
      d="M12 8l1 2 2 .5-1.5 1.5.5 2L12 13l-2 1.5.5-2L9 11l2-.5 1-2z"
      fill="#B8B8B8"
    />
  </svg>
);

// Other Service Icons
export const PWAIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" aria-hidden="true">
    <rect
      x="8"
      y="3"
      width="8"
      height="18"
      rx="2"
      fill="url(#pwaGradient)"
      stroke="#2E5A87"
      strokeWidth="0.5"
    />
    <rect
      x="9"
      y="5"
      width="6"
      height="12"
      rx="1"
      fill="#1F2937"
      stroke="none"
    />
    <circle cx="12" cy="4" r="0.2" fill="#2E5A87" />
    <rect x="10.5" y="3.8" width="3" height="0.3" rx="0.15" fill="#2E5A87" />
    <rect x="10" y="7" width="1.5" height="1.5" rx="0.3" fill="#4A90E2" />
    <rect x="12.5" y="7" width="1.5" height="1.5" rx="0.3" fill="#10B981" />
    <rect x="10" y="9" width="1.5" height="1.5" rx="0.3" fill="#F59E0B" />
    <rect x="12.5" y="9" width="1.5" height="1.5" rx="0.3" fill="#EF4444" />
    <rect x="10" y="11" width="1.5" height="1.5" rx="0.3" fill="#8B5CF6" />
    <rect x="12.5" y="11" width="1.5" height="1.5" rx="0.3" fill="#06B6D4" />
    <rect x="10" y="18" width="4" height="1" rx="0.5" fill="#374151" />
    <circle
      cx="12"
      cy="19.5"
      r="0.6"
      fill="none"
      stroke="#2E5A87"
      strokeWidth="0.5"
    />
    <defs>
      <linearGradient id="pwaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#6BB6FF', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#4A90E2', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
  </svg>
);

export const MediaPartnershipIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-12 h-12"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="url(#mediaGradient)"
      stroke="#5D2E6B"
      strokeWidth="1"
    />
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
      fill="none"
      stroke="#5D2E6B"
      strokeWidth="1"
    />
    <path d="M8 8h8v8H8z" fill="none" stroke="#5D2E6B" strokeWidth="1" rx="1" />
    <path d="M16 10l3 2-3 2z" fill="#5D2E6B" stroke="none" />
    <circle cx="10" cy="10" r="0.8" fill="#5D2E6B" />
    <circle cx="14" cy="10" r="0.8" fill="#5D2E6B" />
    <path d="M9 13h6v1H9z" fill="#5D2E6B" />
    <path d="M10 14h4v1h-4z" fill="#5D2E6B" />
    <defs>
      <linearGradient id="mediaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#B565D8', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8B4A9C', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
  </svg>
);

// Icon component props interface
export interface IconProps {
  className?: string;
  size?: number;
}

// Wrapper components with individual medal icons for each package tier
export const BronzeIcon = () => <BronzePackageIcon />;

export const SilverIcon = () => <SilverPackageIcon />;

export const GoldIcon = () => <GoldPackageIcon />;

export const PlatinumIcon = () => <PlatinumPackageIcon />;
