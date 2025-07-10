import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from './Navigation';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      initial,
      animate,
      transition,
      className,
      ...props
    }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    button: ({
      children,
      initial,
      animate,
      transition,
      className,
      ...props
    }: any) => (
      <button className={className} {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock window.scrollTo
const mockScrollTo = jest.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

// Mock getElementById
const mockGetElementById = jest.fn();
Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
  writable: true,
});

describe('Navigation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockScrollTo.mockClear();
    mockGetElementById.mockClear();

    // Mock scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
  });

  it('renders navigation with correct structure', () => {
    render(<Navigation />);

    // Check main navigation element
    expect(
      screen.getByRole('navigation', { name: /main navigation/i })
    ).toBeInTheDocument();

    // Check logo
    expect(
      screen.getByRole('button', { name: /go to homepage/i })
    ).toBeInTheDocument();
    expect(screen.getByText('MPDEE')).toBeInTheDocument();

    // Check mobile menu button
    expect(
      screen.getByRole('button', { name: /open menu/i })
    ).toBeInTheDocument();
  });

  it('renders custom logo when provided', () => {
    render(<Navigation logo="Custom Logo" />);

    expect(screen.getByText('Custom Logo')).toBeInTheDocument();
  });

  it('renders all navigation items correctly', () => {
    render(<Navigation />);

    // Check desktop navigation items (use text content instead of aria-label)
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();

    // Check CTA button
    expect(
      screen.getByRole('button', { name: /get in touch/i })
    ).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger button is clicked', async () => {
    render(<Navigation />);

    const menuButton = screen.getByRole('button', { name: /open menu/i });

    // Initially menu should be closed
    expect(
      screen.queryByRole('button', { name: /close menu/i })
    ).not.toBeInTheDocument();

    // Click to open menu
    fireEvent.click(menuButton);

    // Menu should be open
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /close menu/i })
      ).toBeInTheDocument();
    });

    // Click to close menu
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));

    // Menu should be closed again
    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: /close menu/i })
      ).not.toBeInTheDocument();
    });
  });

  it('shows mobile menu items when menu is open', async () => {
    render(<Navigation />);

    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /close menu/i })
      ).toBeInTheDocument();
    });
  });

  it('handles logo click correctly', () => {
    render(<Navigation />);

    const logoButton = screen.getByRole('button', { name: /go to homepage/i });
    fireEvent.click(logoButton);

    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('handles navigation item clicks correctly', () => {
    // Mock a section element
    const mockElement = {
      offsetTop: 500,
    };
    mockGetElementById.mockReturnValue(mockElement);

    render(<Navigation />);

    const servicesButton = screen.getByText('Services');
    fireEvent.click(servicesButton);

    expect(mockGetElementById).toHaveBeenCalledWith('services');
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 420, // 500 - 80 (header height)
      behavior: 'smooth',
    });
  });

  it('handles CTA button click correctly', () => {
    const mockElement = {
      offsetTop: 1000,
    };
    mockGetElementById.mockReturnValue(mockElement);

    render(<Navigation />);

    const ctaButton = screen.getByRole('button', { name: /get in touch/i });
    fireEvent.click(ctaButton);

    expect(mockGetElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 920, // 1000 - 80 (header height)
      behavior: 'smooth',
    });
  });

  it('closes mobile menu when navigation item is clicked', async () => {
    render(<Navigation />);

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /close menu/i })
      ).toBeInTheDocument();
    });

    // Click a navigation item in mobile menu
    const mobileHomeButtons = screen.getAllByText('Home');
    fireEvent.click(mobileHomeButtons[1]); // Second one is in mobile menu

    // Menu should close
    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: /close menu/i })
      ).not.toBeInTheDocument();
    });
  });

  it('has proper accessibility attributes', () => {
    render(<Navigation />);

    // Check navigation has proper role and label
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();

    // Check mobile menu button has proper attributes
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');

    // Check navigation buttons have focus styles
    const homeButtons = screen.getAllByText('Home');
    expect(homeButtons[0]).toHaveClass('focus:outline-none', 'focus:ring-2');
  });

  it('updates aria-expanded when mobile menu is toggled', async () => {
    render(<Navigation />);

    const menuButton = screen.getByRole('button', { name: /open menu/i });

    // Initially should be false
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    fireEvent.click(menuButton);

    await waitFor(() => {
      const closeButton = screen.getByRole('button', { name: /close menu/i });
      expect(closeButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('handles scroll events for navigation styling', () => {
    render(<Navigation />);

    // Mock scroll event
    Object.defineProperty(window, 'scrollY', {
      value: 50,
      writable: true,
    });

    fireEvent.scroll(window);

    // Navigation should have scrolled styles
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass(
      'bg-background-dark/95',
      'backdrop-blur-sm',
      'shadow-lg'
    );
  });

  it('shows correct active section based on scroll position', () => {
    // Mock getBoundingClientRect for services section
    const mockRect = {
      top: 50,
      bottom: 200,
    };

    const mockElement = {
      getBoundingClientRect: () => mockRect,
    };

    mockGetElementById.mockReturnValue(mockElement);

    render(<Navigation />);

    // Mock scroll to services section
    Object.defineProperty(window, 'scrollY', {
      value: 150,
      writable: true,
    });

    fireEvent.scroll(window);

    // Services button should have active styles
    const servicesButtons = screen.getAllByText('Services');
    expect(servicesButtons[0]).toHaveAttribute('aria-current', 'page');
  });

  it('has responsive design classes', () => {
    render(<Navigation />);

    // Check desktop navigation is hidden on mobile
    const desktopNav = screen
      .getByRole('navigation')
      .querySelector('.hidden.md\\:flex');
    expect(desktopNav).toBeInTheDocument();

    // Check mobile menu button is hidden on desktop
    const mobileButton = screen
      .getByRole('navigation')
      .querySelector('.md\\:hidden');
    expect(mobileButton).toBeInTheDocument();
  });

  it('closes mobile menu when overlay is clicked', async () => {
    render(<Navigation />);

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /close menu/i })
      ).toBeInTheDocument();
    });

    // Click overlay (we'll simulate this by finding the overlay div)
    const overlay = document.querySelector('.fixed.inset-0.bg-black\\/20');
    if (overlay) {
      fireEvent.click(overlay);
    }

    // Menu should close
    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: /close menu/i })
      ).not.toBeInTheDocument();
    });
  });

  it('handles keyboard navigation properly', () => {
    render(<Navigation />);

    const homeButtons = screen.getAllByText('Home');
    const homeButton = homeButtons[0];

    // Focus should work
    homeButton.focus();
    expect(homeButton).toHaveFocus();

    // Click should trigger scroll
    fireEvent.click(homeButton);
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
