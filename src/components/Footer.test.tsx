import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders footer with correct structure', () => {
    render(<Footer />);
    
    // Check main footer element
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    // Check company name
    expect(screen.getByText('MPDEE')).toBeInTheDocument();
    
    // Check company description
    expect(screen.getByText(/professional web design and development services/i)).toBeInTheDocument();
  });

  it('renders all service links correctly', () => {
    render(<Footer />);
    
    // Check Services section heading
    expect(screen.getByRole('heading', { name: /services/i })).toBeInTheDocument();
    
    // Check service links
    expect(screen.getByRole('link', { name: /ui\/ux design/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /front-end development/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /full-stack development/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /web consulting/i })).toBeInTheDocument();
  });

  it('renders quick links correctly', () => {
    render(<Footer />);
    
    // Check Quick Links section heading
    expect(screen.getByRole('heading', { name: /quick links/i })).toBeInTheDocument();
    
    // Check navigation links
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders contact information correctly', () => {
    render(<Footer />);
    
    // Check Contact Info section heading
    expect(screen.getByRole('heading', { name: /contact info/i })).toBeInTheDocument();
    
    // Check email link
    const emailLink = screen.getByRole('link', { name: /hello@example.com/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@example.com');
    
    // Check response time
    expect(screen.getByText(/24 hours/i)).toBeInTheDocument();
    
    // Check location
    expect(screen.getByText(/remote & on-site/i)).toBeInTheDocument();
  });

  it('renders social media links with proper accessibility', () => {
    render(<Footer />);
    
    // Check social media links
    expect(screen.getByRole('link', { name: /follow us on twitter/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /follow us on linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /follow us on github/i })).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} MPDEE. All rights reserved.`))).toBeInTheDocument();
  });

  it('renders legal links correctly', () => {
    render(<Footer />);
    
    // Check legal links
    expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /terms of service/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cookie policy/i })).toBeInTheDocument();
  });

  it('has proper link attributes for navigation', () => {
    render(<Footer />);
    
    // Check internal navigation links have correct href attributes
    const servicesLinks = screen.getAllByRole('link', { name: /services/i });
    const portfolioLink = screen.getByRole('link', { name: /portfolio/i });
    const contactLink = screen.getByRole('link', { name: /contact/i });
    
    // Services links should point to #services
    servicesLinks.forEach(link => {
      if (link.textContent?.includes('Services') && !link.textContent?.includes('UI/UX')) {
        expect(link).toHaveAttribute('href', '#services');
      }
    });
    
    expect(portfolioLink).toHaveAttribute('href', '#portfolio');
    expect(contactLink).toHaveAttribute('href', '#contact');
  });

  it('has proper hover states for links', () => {
    render(<Footer />);
    
    // Check that links have hover transition classes
    const serviceLinks = screen.getAllByRole('link');
    
    serviceLinks.forEach(link => {
      expect(link).toHaveClass('transition-colors');
    });
  });

  it('renders with proper semantic structure', () => {
    render(<Footer />);
    
    // Check footer has proper semantic role
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Check headings are properly structured
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(4); // MPDEE, Services, Quick Links, Contact Info
    
    // Check lists are properly structured
    const lists = screen.getAllByRole('list');
    expect(lists.length).toBeGreaterThan(0);
  });

  it('has responsive grid layout classes', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    const gridContainer = footer.querySelector('.grid');
    
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
  });

  it('renders all required icons', () => {
    render(<Footer />);
    
    // Check social media icons (SVGs)
    const svgElements = screen.getByRole('contentinfo').querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(5); // Social icons + contact icons
  });
}); 