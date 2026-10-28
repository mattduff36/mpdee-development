import { render } from '@testing-library/react';
import { Asterisk, BrandMark } from '../Marks';

const LOGO_SRC = '/images/MPDEE-Development-logo-trans.png';

function expectTriangle(container: HTMLElement, className?: string) {
  const mark = container.querySelector('svg');
  const mask = container.querySelector('mask');
  const image = container.querySelector('image');
  const rect = container.querySelector('rect');

  expect(mark).not.toBeNull();
  expect(mark).toHaveAttribute('width', '72');
  expect(mark).toHaveAttribute('height', '72');
  expect(mark).toHaveAttribute('viewBox', '0 0 80 80');
  expect(mark).toHaveAttribute('aria-hidden', 'true');
  if (className) {
    expect(mark).toHaveAttribute('class', className);
  } else {
    expect(mark).not.toHaveAttribute('class');
  }
  expect(mask?.getAttribute('mask-type') ?? mask?.style.maskType).toBe('alpha');
  expect(image).toHaveAttribute('href', LOGO_SRC);
  expect(image).toHaveAttribute('width', '80');
  expect(image).toHaveAttribute('height', '80');
  expect(rect).toHaveAttribute('fill', 'currentColor');
  expect(rect?.getAttribute('mask')).toBe(`url(#${mask?.id})`);
  expect(container.querySelector('path')).toBeNull();
  return mask?.id;
}

describe('Asterisk', () => {
  it('masks the MPDEE triangle in the original 72 by 72 svg', () => {
    const { container } = render(<Asterisk />);
    expectTriangle(container);
  });

  it('passes the caller class through and keeps a single currentColor fill', () => {
    const { container } = render(<Asterisk className="contact-asterisk" />);
    const mark = container.querySelector('svg');
    expectTriangle(container, 'contact-asterisk');
    expect(mark).not.toHaveClass('brand-mark');
    expect(container.querySelectorAll('rect')).toHaveLength(1);
  });

  it('gives each mark its own mask id', () => {
    const { container } = render(
      <>
        <Asterisk />
        <BrandMark />
      </>
    );
    const ids = Array.from(container.querySelectorAll('mask')).map(
      mask => mask.id
    );
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
    expect(ids.every(id => id.startsWith('mpdee-mark-'))).toBe(true);
  });
});

describe('BrandMark', () => {
  it('uses the same currentColor triangle as Asterisk', () => {
    const { container } = render(<BrandMark className="cta-alias" />);
    expectTriangle(container, 'cta-alias');
  });
});
