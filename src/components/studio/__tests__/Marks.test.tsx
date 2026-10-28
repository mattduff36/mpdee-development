import { render } from '@testing-library/react';
import { Asterisk, BrandMark } from '../Marks';

const LOGO_SRC = '/images/MPDEE-Development-logo-trans.png';

function markImage(container: HTMLElement) {
  return container.querySelector('image');
}

describe('BrandMark', () => {
  it('renders the existing MPDEE triangle without clipping or an asterisk', () => {
    const { container } = render(<BrandMark />);
    const mark = container.querySelector('svg');
    const image = markImage(container);

    expect(mark).toHaveClass('brand-mark');
    expect(mark).toHaveAttribute('aria-hidden', 'true');
    expect(mark).toHaveAttribute('viewBox', '0 0 72 72');
    expect(image).not.toBeNull();
    expect(image).toHaveAttribute('href', LOGO_SRC);
    expect(image).toHaveAttribute('width', '72');
    expect(image).toHaveAttribute('height', '72');
    expect(image?.getAttribute('preserveAspectRatio')).toBe('xMidYMid meet');
    expect(container.querySelector('path')).toBeNull();
  });

  it('keeps Asterisk as a decorative alias of the same logo', () => {
    const { container } = render(<Asterisk className="contact-asterisk" />);
    const mark = container.querySelector('svg');
    const image = markImage(container);

    expect(mark).toHaveClass('brand-mark', 'contact-asterisk');
    expect(mark).toHaveAttribute('aria-hidden', 'true');
    expect(image).toHaveAttribute('href', LOGO_SRC);
    expect(container).not.toHaveTextContent('M40 4v72');
  });
});
