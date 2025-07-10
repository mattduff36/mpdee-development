import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Hero from './Hero';

// Mock scrollIntoView since it's not available in test environment
const mockScrollIntoView = jest.fn();
Object.defineProperty(window.Element.prototype, 'scrollIntoView', {
  writable: true,
  value: mockScrollIntoView,
});

// Mock getElementById
const mockGetElementById = jest.fn();
Object.defineProperty(document, 'getElementById', {
  writable: true,
  value: mockGetElementById,
});

describe('Hero', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear();
    mockGetElementById.mockClear();
  });

  it('renders hero content correctly', () => {
    render(<Hero />);
    
    expect(screen.getByText('Professional Web Design & Development')).toBeInTheDocument();
    expect(screen.getByText(/We create beautiful, functional websites/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });

  it('calls custom onGetStarted handler when provided', () => {
    const mockOnGetStarted = jest.fn();
    render(<Hero onGetStarted={mockOnGetStarted} />);
    
    const button = screen.getByRole('button', { name: /get started/i });
    fireEvent.click(button);
    
    expect(mockOnGetStarted).toHaveBeenCalledTimes(1);
  });

  it('scrolls to contact section when no custom handler provided', () => {
    const mockContactElement = { scrollIntoView: mockScrollIntoView };
    mockGetElementById.mockReturnValue(mockContactElement);
    
    render(<Hero />);
    
    const button = screen.getByRole('button', { name: /get started/i });
    fireEvent.click(button);
    
    expect(mockGetElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('handles missing contact section gracefully', () => {
    mockGetElementById.mockReturnValue(null);
    
    render(<Hero />);
    
    const button = screen.getByRole('button', { name: /get started/i });
    fireEvent.click(button);
    
    expect(mockGetElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    render(<Hero />);
    
    const button = screen.getByRole('button', { name: /get started/i });
    expect(button).toHaveAttribute('aria-label', 'Get started with our web design services');
    
    // Check that the scroll icon has aria-hidden attribute
    const scrollIcon = screen.getByText('Scroll to explore').nextElementSibling;
    expect(scrollIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it('triggers animation state after mounting', async () => {
    render(<Hero />);
    
    // Wait for the animation to trigger
    await waitFor(() => {
      const heading = screen.getByText('Professional Web Design & Development');
      expect(heading).toHaveClass('opacity-100');
    }, { timeout: 200 });
  });
}); 