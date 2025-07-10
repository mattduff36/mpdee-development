import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Services from './Services';

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

describe('Services Component', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear();
  });

  it('renders services section with correct structure', () => {
    render(<Services />);

    // Check main heading
    expect(
      screen.getByRole('heading', { level: 2, name: /our services/i })
    ).toBeInTheDocument();

    // Check description
    expect(
      screen.getByText(/we deliver comprehensive web solutions/i)
    ).toBeInTheDocument();

    // Check main CTA button
    expect(
      screen.getByRole('button', { name: /discuss your project/i })
    ).toBeInTheDocument();
  });

  it('renders all three service cards', () => {
    render(<Services />);

    // Check service titles
    expect(
      screen.getByRole('heading', { level: 3, name: /ui\/ux design/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /front-end development/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /full-stack development/i })
    ).toBeInTheDocument();

    // Check service descriptions
    expect(
      screen.getByText(/creating intuitive and visually appealing/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/building responsive, interactive web applications/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/end-to-end web application development/i)
    ).toBeInTheDocument();

    // Check Learn More buttons
    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });
    expect(learnMoreButtons).toHaveLength(3);
  });

  it('opens modal when Learn More button is clicked', async () => {
    render(<Services />);

    // Click on UI/UX Design Learn More button
    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });
    fireEvent.click(learnMoreButtons[0]);

    // Check modal is open
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(
        screen.getByText('UI/UX Design', { selector: '#modal-title' })
      ).toBeInTheDocument();
    });

    // Check modal content
    expect(screen.getByText(/what we deliver:/i)).toBeInTheDocument();
    expect(screen.getByText(/technologies we use:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/user research and persona development/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/figma/i)).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    render(<Services />);

    // Open modal
    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });
    fireEvent.click(learnMoreButtons[0]);

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
    render(<Services />);

    // Open modal
    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });
    fireEvent.click(learnMoreButtons[0]);

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

  it('handles keyboard navigation for Learn More buttons', async () => {
    render(<Services />);

    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });

    // Test Enter key
    fireEvent.keyDown(learnMoreButtons[0], { key: 'Enter' });
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
    fireEvent.keyDown(learnMoreButtons[1], { key: ' ' });
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('closes modal with Escape key', async () => {
    render(<Services />);

    // Open modal
    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });
    fireEvent.click(learnMoreButtons[0]);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Press Escape
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('handles Get Started button in modal', async () => {
    render(<Services />);

    // Mock getElementById to return a mock element
    const mockContactElement = { scrollIntoView: mockScrollIntoView };
    jest
      .spyOn(document, 'getElementById')
      .mockReturnValue(mockContactElement as any);

    // Open modal
    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });
    fireEvent.click(learnMoreButtons[0]);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Click Get Started button
    const getStartedButton = screen.getByRole('button', {
      name: /get started/i,
    });
    fireEvent.click(getStartedButton);

    // Check modal is closed and scroll is called
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });
  });

  it('handles main Discuss Your Project button', () => {
    render(<Services />);

    // Mock getElementById to return a mock element
    const mockContactElement = { scrollIntoView: mockScrollIntoView };
    jest
      .spyOn(document, 'getElementById')
      .mockReturnValue(mockContactElement as any);

    // Click main CTA button
    const discussButton = screen.getByRole('button', {
      name: /discuss your project/i,
    });
    fireEvent.click(discussButton);

    // Check scroll is called
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('has proper accessibility attributes', () => {
    render(<Services />);

    // Check service icons have proper aria-label
    const icons = screen.getAllByRole('img');
    expect(icons[0]).toHaveAttribute('aria-label', 'UI/UX Design');
    expect(icons[1]).toHaveAttribute('aria-label', 'Front-end Development');
    expect(icons[2]).toHaveAttribute('aria-label', 'Full-Stack Development');

    // Check buttons have proper aria-labels
    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more about/i,
    });
    expect(learnMoreButtons).toHaveLength(3);

    // Check main CTA button has proper aria-label
    const discussButton = screen.getByRole('button', {
      name: /discuss your project with us/i,
    });
    expect(discussButton).toBeInTheDocument();
  });

  it('displays correct content for each service', () => {
    render(<Services />);

    // Open UI/UX Design modal
    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });
    fireEvent.click(learnMoreButtons[0]);

    // Check UI/UX specific content
    expect(
      screen.getByText(/user research and persona development/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/figma/i)).toBeInTheDocument();

    // Close and open Front-end Development modal
    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);

    fireEvent.click(learnMoreButtons[1]);

    // Check Front-end specific content
    expect(screen.getByText(/responsive web development/i)).toBeInTheDocument();
    expect(screen.getByText(/react/i)).toBeInTheDocument();
  });

  it('prevents modal content click from closing modal', async () => {
    render(<Services />);

    // Open modal
    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });
    fireEvent.click(learnMoreButtons[0]);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Click on modal content (not overlay)
    const modalContent = screen.getByText(/what we deliver:/i);
    fireEvent.click(modalContent);

    // Modal should still be open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
