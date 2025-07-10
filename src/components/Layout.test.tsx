import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div data-testid="child">Hello</div>
      </Layout>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('renders header with navigation', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    // Check for navigation
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Check for logo in navigation
    expect(
      screen.getByRole('button', { name: /go to homepage/i })
    ).toBeInTheDocument();
  });

  it('renders footer with content', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    // Check for footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    // Check for footer content - be more specific
    expect(screen.getByText('UI/UX Design')).toBeInTheDocument();
    expect(screen.getByText('Front-end Development')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Development')).toBeInTheDocument();
  });

  it('renders main content area', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    // Check for main content
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
