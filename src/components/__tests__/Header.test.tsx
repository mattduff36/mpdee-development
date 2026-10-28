import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    priority: _priority,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => (
    <img {...props} alt={props.alt ?? ''} />
  ),
}));

describe('Header', () => {
  it('adds a dark full stop to the mpdee wordmark', () => {
    render(<Header />);
    const home = screen.getByRole('link', { name: 'MPDEE Development home' });
    const stop = home.querySelector('.brand-stop');

    expect(home).toHaveTextContent('mpdee.DEVELOPMENT');
    expect(stop).toHaveTextContent('.');
    expect(stop).not.toHaveClass('footer-brand');
    expect(home.querySelector('.brand-name')).toHaveTextContent(
      'mpdee.DEVELOPMENT'
    );
  });
});
