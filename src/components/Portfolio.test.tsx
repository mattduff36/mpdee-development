import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Portfolio from './Portfolio';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock scrollIntoView
const mockScrollIntoView = jest.fn();
Object.defineProperty(window.Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
});

describe('Portfolio Component', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear();
  });

  it('renders portfolio section with correct structure', () => {
    render(<Portfolio />);

    // Check main heading
    expect(
      screen.getByRole('heading', { level: 2, name: /featured projects/i })
    ).toBeInTheDocument();

    // Check description
    expect(screen.getByText(/explore our recent work/i)).toBeInTheDocument();

    // Check CTA button
    expect(
      screen.getByRole('button', { name: /get in touch with us/i })
    ).toBeInTheDocument();
  });

  it('renders all project cards initially', () => {
    render(<Portfolio />);

    // Check project titles
    expect(screen.getByText('Lee Barrowcliff Photography')).toBeInTheDocument();
    expect(screen.getByText('Victoria Rose Salon')).toBeInTheDocument();
    expect(screen.getByText('Paintings by Kay')).toBeInTheDocument();

    // Check project descriptions
    expect(
      screen.getByText(
        /professional photography portfolio website with secure client authentication and admin portal/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /dynamic salon website with automated content management and integrated booking system/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /e-commerce art platform with integrated order management and commission system/i
      )
    ).toBeInTheDocument();
  });

  it('renders filter buttons correctly', () => {
    render(<Portfolio />);

    // Check All Projects button
    expect(
      screen.getByRole('button', { name: /all projects/i })
    ).toBeInTheDocument();

    // Check tag filter buttons by finding buttons with aria-pressed attribute
    const filterButtons = screen.getAllByRole('button');
    const filterButtonsWithAria = filterButtons.filter(button =>
      button.hasAttribute('aria-pressed')
    );

    expect(filterButtonsWithAria).toHaveLength(8); // All Projects + 7 tag filters (Photography, Portfolio, Beauty, Business, Transport, Entertainment, Art)
    expect(
      filterButtonsWithAria.find(button => button.textContent === 'Photography')
    ).toBeInTheDocument();
    expect(
      filterButtonsWithAria.find(button => button.textContent === 'Beauty')
    ).toBeInTheDocument();
    expect(
      filterButtonsWithAria.find(button => button.textContent === 'Transport')
    ).toBeInTheDocument();
    expect(
      filterButtonsWithAria.find(button => button.textContent === 'Art')
    ).toBeInTheDocument();
    expect(
      filterButtonsWithAria.find(button => button.textContent === 'Portfolio')
    ).toBeInTheDocument();
  });

  it('filters projects by tag', () => {
    render(<Portfolio />);

    // Initially all projects should be visible
    expect(screen.getByText('Lee Barrowcliff Photography')).toBeInTheDocument();
    expect(screen.getByText('Victoria Rose Salon')).toBeInTheDocument();
    expect(screen.getByText('Paintings by Kay')).toBeInTheDocument();

    // Filter by Photography tag
    const filterButtons = screen.getAllByRole('button');
    const photographyFilterButton = filterButtons.find(
      button =>
        button.textContent === 'Photography' &&
        button.hasAttribute('aria-pressed')
    );
    fireEvent.click(photographyFilterButton!);

    // Only Lee Barrowcliff Photography should be visible
    expect(screen.getByText('Lee Barrowcliff Photography')).toBeInTheDocument();
    expect(screen.queryByText('Victoria Rose Salon')).not.toBeInTheDocument();
    expect(screen.queryByText('Paintings by Kay')).not.toBeInTheDocument();

    // Filter by Beauty tag
    const beautyFilterButton = filterButtons.find(
      button =>
        button.textContent === 'Beauty' && button.hasAttribute('aria-pressed')
    );
    fireEvent.click(beautyFilterButton!);

    // Only Victoria Rose Salon should be visible
    expect(
      screen.queryByText('Lee Barrowcliff Photography')
    ).not.toBeInTheDocument();
    expect(screen.getByText('Victoria Rose Salon')).toBeInTheDocument();
    expect(screen.queryByText('Paintings by Kay')).not.toBeInTheDocument();

    // Return to All Projects
    fireEvent.click(screen.getByRole('button', { name: /all projects/i }));

    // All projects should be visible again
    expect(screen.getByText('Lee Barrowcliff Photography')).toBeInTheDocument();
    expect(screen.getByText('Victoria Rose Salon')).toBeInTheDocument();
    expect(screen.getByText('Paintings by Kay')).toBeInTheDocument();
  });

  it('opens project modal when project card is clicked', async () => {
    render(<Portfolio />);

    // Click on Lee Barrowcliff Photography project
    const projectCards = screen.getAllByRole('button', {
      name: /view details for/i,
    });
    fireEvent.click(projectCards[0]);

    // Check modal is open
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(
        screen.getByText('Lee Barrowcliff Photography', {
          selector: '#project-modal-title',
        })
      ).toBeInTheDocument();
    });

    // Check modal content
    expect(screen.getByText(/key outcomes:/i)).toBeInTheDocument();
    expect(screen.getByText(/technologies used:/i)).toBeInTheDocument();
    expect(screen.getByText(/react/i)).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    render(<Portfolio />);

    // Open modal
    const projectCards = screen.getAllByRole('button', {
      name: /view details for/i,
    });
    fireEvent.click(projectCards[0]);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Close modal
    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes modal when clicking outside', async () => {
    render(<Portfolio />);

    // Open modal
    const projectCards = screen.getAllByRole('button', {
      name: /view details for/i,
    });
    fireEvent.click(projectCards[0]);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Click outside modal
    const modalOverlay = screen.getByRole('dialog');
    fireEvent.click(modalOverlay);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('handles keyboard navigation for project cards', async () => {
    render(<Portfolio />);

    const projectCards = screen.getAllByRole('button', {
      name: /view details for/i,
    });

    // Test Enter key
    fireEvent.keyDown(projectCards[0], { key: 'Enter' });
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Close modal
    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    // Test Space key
    fireEvent.keyDown(projectCards[1], { key: ' ' });
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('closes modal with Escape key', async () => {
    render(<Portfolio />);

    // Open modal
    const projectCards = screen.getAllByRole('button', {
      name: /view details for/i,
    });
    fireEvent.click(projectCards[0]);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Press Escape
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('handles Start Your Project button in modal', async () => {
    render(<Portfolio />);

    // Mock getElementById to return a mock element
    const mockContactElement = { scrollIntoView: mockScrollIntoView };
    jest
      .spyOn(document, 'getElementById')
      .mockReturnValue(mockContactElement as any);

    // Open modal
    const projectCards = screen.getAllByRole('button', {
      name: /view details for/i,
    });
    fireEvent.click(projectCards[0]);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Click Start Your Project button
    const startProjectButton = screen.getByRole('button', {
      name: /start your project/i,
    });
    fireEvent.click(startProjectButton);

    // Check modal is closed and scroll is called
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });
  });

  it('handles main Get in Touch button', () => {
    render(<Portfolio />);

    // Mock getElementById to return a mock element
    const mockContactElement = { scrollIntoView: mockScrollIntoView };
    jest
      .spyOn(document, 'getElementById')
      .mockReturnValue(mockContactElement as any);

    // Click main CTA button
    const getInTouchButton = screen.getByRole('button', {
      name: /get in touch with us/i,
    });
    fireEvent.click(getInTouchButton);

    // Check scroll is called
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('has proper accessibility attributes', () => {
    render(<Portfolio />);

    // Check filter buttons have proper aria-pressed
    const allProjectsButton = screen.getByRole('button', {
      name: /all projects/i,
    });
    expect(allProjectsButton).toHaveAttribute('aria-pressed', 'true');

    const filterButtons = screen.getAllByRole('button');
    const photographyFilterButton = filterButtons.find(
      button =>
        button.textContent === 'Photography' &&
        button.hasAttribute('aria-pressed')
    );
    expect(photographyFilterButton).toHaveAttribute('aria-pressed', 'false');

    // Check project cards have proper accessibility
    const projectCards = screen.getAllByRole('button', {
      name: /view details for/i,
    });
    expect(projectCards[0]).toHaveAttribute('tabindex', '0');
    expect(projectCards[0]).toHaveAttribute(
      'aria-label',
      'View details for Lee Barrowcliff Photography'
    );
  });

  it('displays project images correctly', () => {
    render(<Portfolio />);

    // Check project images (Next.js optimized images will have different src)
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute(
      'alt',
      'Lee Barrowcliff Photography website screenshot'
    );
    expect(images[1]).toHaveAttribute(
      'alt',
      'Victoria Rose Salon website screenshot'
    );
    expect(images[2]).toHaveAttribute(
      'alt',
      'L.W. Barker Transport Services website screenshot'
    );
    expect(images[3]).toHaveAttribute(
      'alt',
      'T&S Bouncy Castle Hire website screenshot'
    );
    expect(images[4]).toHaveAttribute(
      'alt',
      'Paintings by Kay website screenshot'
    );
  });

  it('displays project tags correctly', () => {
    render(<Portfolio />);

    // Check that tags are displayed on project cards
    expect(screen.getAllByText('Photography')).toHaveLength(2); // Filter button + tag
    expect(screen.getAllByText('Beauty')).toHaveLength(2); // Filter button + tag
    expect(screen.getAllByText('Transport')).toHaveLength(2); // Filter button + tag
    expect(screen.getAllByText('Entertainment')).toHaveLength(2); // Filter button + tag
    expect(screen.getAllByText('Art')).toHaveLength(2); // Filter button + tag
    expect(screen.getAllByText('Portfolio')).toHaveLength(3); // Filter button + 2 tags (Lee Barrowcliff Photography + Paintings by Kay)
  });

  it('prevents modal content click from closing modal', async () => {
    render(<Portfolio />);

    // Open modal
    const projectCards = screen.getAllByRole('button', {
      name: /view details for/i,
    });
    fireEvent.click(projectCards[0]);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Click on modal content (not overlay)
    const modalContent = screen.getByText(/key outcomes:/i);
    fireEvent.click(modalContent);

    // Modal should still be open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('updates filter button states correctly', () => {
    render(<Portfolio />);

    // Initially All Projects should be active
    const allProjectsButton = screen.getByRole('button', {
      name: /all projects/i,
    });
    const filterButtons = screen.getAllByRole('button');
    const photographyFilterButton = filterButtons.find(
      button =>
        button.textContent === 'Photography' &&
        button.hasAttribute('aria-pressed')
    );

    expect(allProjectsButton).toHaveAttribute('aria-pressed', 'true');
    expect(photographyFilterButton).toHaveAttribute('aria-pressed', 'false');

    // Click Photography filter
    fireEvent.click(photographyFilterButton!);

    // Photography should be active, All Projects should be inactive
    expect(allProjectsButton).toHaveAttribute('aria-pressed', 'false');
    expect(photographyFilterButton).toHaveAttribute('aria-pressed', 'true');
  });
});
