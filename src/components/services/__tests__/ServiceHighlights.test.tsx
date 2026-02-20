import { render, screen } from '@testing-library/react';
import { ServiceHighlights } from '../ServiceHighlights';

describe('ServiceHighlights', () => {
  it('renders highlighted service packages', () => {
    render(<ServiceHighlights />);
    expect(screen.getByText(/Starter Package/i)).toBeInTheDocument();
    expect(screen.getByText(/Basic Package/i)).toBeInTheDocument();
    expect(screen.getByText(/Pro Package/i)).toBeInTheDocument();
  });

  it('excludes coming soon and partnership packages', () => {
    render(<ServiceHighlights />);
    expect(
      screen.queryByText(/Progressive Web Applications/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Media & Marketing Partnership/i)
    ).not.toBeInTheDocument();
  });

  it('has links to services page', () => {
    render(<ServiceHighlights />);
    const links = screen.getAllByRole('link', { name: /learn more/i });
    expect(links.length).toBeGreaterThan(0);
  });
});
