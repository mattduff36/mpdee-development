import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Portfolio from './Portfolio';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, exit, transition, whileInView, viewport, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, initial, animate, exit, transition, whileInView, viewport, ...props }: any) => <section {...props}>{children}</section>,
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
    expect(screen.getByRole('heading', { level: 2, name: /featured projects/i })).toBeInTheDocument();
    
    // Check description
    expect(screen.getByText(/explore our recent work/i)).toBeInTheDocument();
    
    // Check CTA button
    expect(screen.getByRole('button', { name: /get in touch with us/i })).toBeInTheDocument();
  });

  it('renders all project cards initially', () => {
    render(<Portfolio />);
    
    // Check project titles
    expect(screen.getByText('LBP Construction Website')).toBeInTheDocument();
    expect(screen.getByText('Victoria Rose Salon')).toBeInTheDocument();
    expect(screen.getByText('Paintings by Kay')).toBeInTheDocument();
    
    // Check project descriptions
    expect(screen.getByText(/modern construction company website/i)).toBeInTheDocument();
    expect(screen.getByText(/elegant salon website/i)).toBeInTheDocument();
    expect(screen.getByText(/artist portfolio website/i)).toBeInTheDocument();
  });

  it('renders filter buttons correctly', () => {
    render(<Portfolio />);
    
    // Check All Projects button
    expect(screen.getByRole('button', { name: /all projects/i })).toBeInTheDocument();
    
    // Check tag filter buttons by finding buttons with aria-pressed attribute
    const filterButtons = screen.getAllByRole('button');
    const filterButtonsWithAria = filterButtons.filter(button => button.hasAttribute('aria-pressed'));
    
    expect(filterButtonsWithAria).toHaveLength(7); // All Projects + 6 tag filters
    expect(filterButtonsWithAria.find(button => button.textContent === 'Construction')).toBeInTheDocument();
    expect(filterButtonsWithAria.find(button => button.textContent === 'Business')).toBeInTheDocument();
    expect(filterButtonsWithAria.find(button => button.textContent === 'Beauty')).toBeInTheDocument();
    expect(filterButtonsWithAria.find(button => button.textContent === 'E-commerce')).toBeInTheDocument();
    expect(filterButtonsWithAria.find(button => button.textContent === 'Art')).toBeInTheDocument();
    expect(filterButtonsWithAria.find(button => button.textContent === 'Portfolio')).toBeInTheDocument();
  });

  it('filters projects by tag', () => {
    render(<Portfolio />);
    
    // Initially all projects should be visible
    expect(screen.getByText('LBP Construction Website')).toBeInTheDocument();
    expect(screen.getByText('Victoria Rose Salon')).toBeInTheDocument();
    expect(screen.getByText('Paintings by Kay')).toBeInTheDocument();
    
    // Filter by Construction tag
    const filterButtons = screen.getAllByRole('button');
    const constructionFilterButton = filterButtons.find(button => 
      button.textContent === 'Construction' && button.hasAttribute('aria-pressed')
    );
    fireEvent.click(constructionFilterButton!);
    
    // Only LBP Construction should be visible
    expect(screen.getByText('LBP Construction Website')).toBeInTheDocument();
    expect(screen.queryByText('Victoria Rose Salon')).not.toBeInTheDocument();
    expect(screen.queryByText('Paintings by Kay')).not.toBeInTheDocument();
    
    // Filter by Beauty tag
    const beautyFilterButton = filterButtons.find(button => 
      button.textContent === 'Beauty' && button.hasAttribute('aria-pressed')
    );
    fireEvent.click(beautyFilterButton!);
    
    // Only Victoria Rose Salon should be visible
    expect(screen.queryByText('LBP Construction Website')).not.toBeInTheDocument();
    expect(screen.getByText('Victoria Rose Salon')).toBeInTheDocument();
    expect(screen.queryByText('Paintings by Kay')).not.toBeInTheDocument();
    
    // Return to All Projects
    fireEvent.click(screen.getByRole('button', { name: /all projects/i }));
    
    // All projects should be visible again
    expect(screen.getByText('LBP Construction Website')).toBeInTheDocument();
    expect(screen.getByText('Victoria Rose Salon')).toBeInTheDocument();
    expect(screen.getByText('Paintings by Kay')).toBeInTheDocument();
  });

  it('opens project modal when project card is clicked', async () => {
    render(<Portfolio />);
    
    // Click on LBP Construction project
    const projectCards = screen.getAllByRole('button', { name: /view details for/i });
    fireEvent.click(projectCards[0]);
    
    // Check modal is open
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('LBP Construction Website', { selector: '#project-modal-title' })).toBeInTheDocument();
    });
    
    // Check modal content
    expect(screen.getByText(/key outcomes:/i)).toBeInTheDocument();
    expect(screen.getByText(/technologies used:/i)).toBeInTheDocument();
    expect(screen.getByText(/increased online inquiries by 150%/i)).toBeInTheDocument();
    expect(screen.getByText(/react/i)).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    render(<Portfolio />);
    
    // Open modal
    const projectCards = screen.getAllByRole('button', { name: /view details for/i });
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
    const projectCards = screen.getAllByRole('button', { name: /view details for/i });
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
    
    const projectCards = screen.getAllByRole('button', { name: /view details for/i });
    
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
    const projectCards = screen.getAllByRole('button', { name: /view details for/i });
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
    jest.spyOn(document, 'getElementById').mockReturnValue(mockContactElement as any);
    
    // Open modal
    const projectCards = screen.getAllByRole('button', { name: /view details for/i });
    fireEvent.click(projectCards[0]);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    // Click Start Your Project button
    const startProjectButton = screen.getByRole('button', { name: /start your project/i });
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
    jest.spyOn(document, 'getElementById').mockReturnValue(mockContactElement as any);
    
    // Click main CTA button
    const getInTouchButton = screen.getByRole('button', { name: /get in touch with us/i });
    fireEvent.click(getInTouchButton);
    
    // Check scroll is called
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('has proper accessibility attributes', () => {
    render(<Portfolio />);
    
    // Check filter buttons have proper aria-pressed
    const allProjectsButton = screen.getByRole('button', { name: /all projects/i });
    expect(allProjectsButton).toHaveAttribute('aria-pressed', 'true');
    
    const filterButtons = screen.getAllByRole('button');
    const constructionFilterButton = filterButtons.find(button => 
      button.textContent === 'Construction' && button.hasAttribute('aria-pressed')
    );
    expect(constructionFilterButton).toHaveAttribute('aria-pressed', 'false');
    
    // Check project cards have proper accessibility
    const projectCards = screen.getAllByRole('button', { name: /view details for/i });
    expect(projectCards[0]).toHaveAttribute('tabindex', '0');
    expect(projectCards[0]).toHaveAttribute('aria-label', 'View details for LBP Construction Website');
  });

  it('displays project images correctly', () => {
    render(<Portfolio />);
    
    // Check project images
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', '/images/LBP-Logo.png');
    expect(images[0]).toHaveAttribute('alt', 'LBP Construction Website');
    expect(images[1]).toHaveAttribute('src', '/images/victoria-rose-salon-logo.jpeg');
    expect(images[1]).toHaveAttribute('alt', 'Victoria Rose Salon');
    expect(images[2]).toHaveAttribute('src', '/images/paintings-by-kay-logo.png');
    expect(images[2]).toHaveAttribute('alt', 'Paintings by Kay');
  });

  it('displays project tags correctly', () => {
    render(<Portfolio />);
    
    // Check that tags are displayed on project cards
    expect(screen.getAllByText('Construction')).toHaveLength(2); // Filter button + tag
    expect(screen.getAllByText('Business')).toHaveLength(2); // Filter button + tag
    expect(screen.getAllByText('Beauty')).toHaveLength(2); // Filter button + tag
    expect(screen.getAllByText('E-commerce')).toHaveLength(2); // Filter button + tag
    expect(screen.getAllByText('Art')).toHaveLength(2); // Filter button + tag
    expect(screen.getAllByText('Portfolio')).toHaveLength(2); // Filter button + tag
  });

  it('prevents modal content click from closing modal', async () => {
    render(<Portfolio />);
    
    // Open modal
    const projectCards = screen.getAllByRole('button', { name: /view details for/i });
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
    const allProjectsButton = screen.getByRole('button', { name: /all projects/i });
    const filterButtons = screen.getAllByRole('button');
    const constructionFilterButton = filterButtons.find(button => 
      button.textContent === 'Construction' && button.hasAttribute('aria-pressed')
    );
    
    expect(allProjectsButton).toHaveAttribute('aria-pressed', 'true');
    expect(constructionFilterButton).toHaveAttribute('aria-pressed', 'false');
    
    // Click Construction filter
    fireEvent.click(constructionFilterButton!);
    
    // Construction should be active, All Projects should be inactive
    expect(allProjectsButton).toHaveAttribute('aria-pressed', 'false');
    expect(constructionFilterButton).toHaveAttribute('aria-pressed', 'true');
  });
}); 