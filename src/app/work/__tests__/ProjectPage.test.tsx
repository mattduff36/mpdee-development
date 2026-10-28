import { render, screen } from '@testing-library/react';
import ProjectPage, { generateStaticParams } from '../[slug]/page';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    fill: _fill,
    priority: _priority,
    unoptimized: _unoptimized,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    priority?: boolean;
    unoptimized?: boolean;
  }) => <img {...props} alt={props.alt} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('not found');
  },
}));

describe('project case study', () => {
  it('includes DigiDocs in static params', () => {
    expect(generateStaticParams()).toEqual(
      expect.arrayContaining([{ slug: 'digidocs' }])
    );
  });

  it('renders DigiDocs as a private case study without a live link', async () => {
    render(
      await ProjectPage({ params: Promise.resolve({ slug: 'digidocs' }) })
    );

    expect(
      screen.queryByRole('link', { name: /Visit the live site/i })
    ).not.toBeInTheDocument();
    expect(screen.getAllByText('Private application').length).toBeGreaterThan(
      0
    );
    expect(
      screen.getByText(
        'DigiDocs dashboard on desktop and mobile, shown using the demo account.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: 'DigiDocs demo dashboard on desktop and mobile',
      })
    ).toHaveAttribute('src', '/images/work/digidocs-desktop-mobile.webp');
    expect(screen.queryByText(/digidocs\.mpdee/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/https?:\/\//i)).not.toBeInTheDocument();
    expect(screen.getByText('Digital forms')).toBeInTheDocument();
    expect(screen.getByText('Employee timesheets')).toBeInTheDocument();
    expect(screen.getByText('Vehicle inspections')).toBeInTheDocument();
    expect(screen.getByText('Policy documents')).toBeInTheDocument();
    expect(screen.queryByText(/squires/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/offline/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/real-?time/i)).not.toBeInTheDocument();
  });

  it('keeps the live link on a public case study', async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: 'itrader' }) }));

    expect(
      screen.getByRole('link', { name: /Visit the live site/i })
    ).toHaveAttribute('href', 'https://itrader.im/');
    expect(screen.getByText('itrader.im')).toBeInTheDocument();
    expect(screen.queryByText('Private application')).not.toBeInTheDocument();
  });
});
