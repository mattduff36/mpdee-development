'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Arrow } from './studio/Marks';
const navigation = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'The studio', href: '/#studio' },
];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function close(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="MPDEE Development home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/MPDEE-Development-logo-trans.png"
            alt=""
            width={38}
            height={36}
            priority
          />
          <span className="brand-name">
            <span>
              mpdee<span className="brand-stop">.</span>
            </span>
            <span className="brand-sub">DEVELOPMENT</span>
          </span>
        </Link>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-controls="main-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
          <span
            className={open ? 'menu-lines is-open' : 'menu-lines'}
            aria-hidden="true"
          >
            <i />
            <i />
          </span>
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={'main-nav' + (open ? ' is-open' : '')}
        >
          {navigation.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={
                pathname.startsWith(item.href) && item.href !== '/#studio'
                  ? 'page'
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="header-cta"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <Arrow />
          </Link>
        </nav>
      </div>
    </header>
  );
}
