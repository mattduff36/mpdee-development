import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

describe('Footer', () => {
  it('renders company name and year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(currentYear.toString()))
    ).toBeInTheDocument();
    expect(
      screen.getByText('© ' + currentYear + ' MPDEE Development')
    ).toBeInTheDocument();
  });

  it('keeps the accent wordmark stop and supporting copy', () => {
    render(<Footer />);
    const brand = screen.getByRole('link', { name: /^mpdee/i });
    expect(brand.textContent?.replace(/\s+/g, '')).toBe('mpdee.');
    expect(brand.querySelector('span')).toHaveTextContent('.');
    expect(screen.getByText(/Websites and web apps,/)).toBeInTheDocument();
    expect(
      screen.getByText(/designed and built by Matt\./)
    ).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
