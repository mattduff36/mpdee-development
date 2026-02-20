import { render, screen } from '@testing-library/react';
import { Projects } from '../Projects';

describe('Projects', () => {
  it('renders all projects when no range specified', () => {
    render(<Projects />);
    expect(
      screen.getByText(/Lee Barrowcliff Photography/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Voiceover Studio Finder/i)).toBeInTheDocument();
    expect(screen.getAllByText(/View project/i).length).toBe(6);
  });

  it('renders subset when range specified', () => {
    render(<Projects range={[1, 3]} />);
    expect(
      screen.getByText(/Lee Barrowcliff Photography/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/View project/i).length).toBe(3);
  });

  it('renders project titles', () => {
    render(<Projects range={[1, 1]} />);
    expect(
      screen.getByText(/Lee Barrowcliff Photography/i)
    ).toBeInTheDocument();
  });
});
