import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sitemap from '@/app/sitemap';
import { projects } from '@/data/projects';
import { ProjectExplorer } from '../ProjectExplorer';
import { ProjectCard } from '../ProjectCard';

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
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const featuredSlugs = [
  'itrader',
  'digidocs',
  'voiceover-studio-finder',
  'lee-barrowcliff',
];

describe('studio projects', () => {
  it('keeps DigiDocs in the homepage slice with Voiceover Studio Finder third', () => {
    expect(projects.slice(0, 4).map(project => project.slug)).toEqual(
      featuredSlugs
    );
    expect(projects.map(project => project.slug)).toEqual([
      ...featuredSlugs,
      'victoria-rose',
      'ts-bouncy-castle-hire',
      'paintings-by-kay',
      'lw-barker',
    ]);
  });

  it('shows DigiDocs in the Platforms filter and keeps website projects out of it', async () => {
    const user = userEvent.setup();
    render(<ProjectExplorer projects={projects} />);

    await user.click(screen.getByRole('button', { name: /Platforms/i }));

    expect(
      screen.getByRole('link', { name: 'Explore DigiDocs' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Explore iTrader.im' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', {
        name: 'Explore Lee Barrowcliff Photography',
      })
    ).not.toBeInTheDocument();
  });

  it('labels the private DigiDocs card and keeps the public iTrader address', () => {
    const digidocs = projects.find(project => project.slug === 'digidocs');
    const itrader = projects.find(project => project.slug === 'itrader');
    if (!digidocs || !itrader) throw new Error('expected portfolio entries');

    const { unmount } = render(<ProjectCard project={digidocs} index={1} />);

    expect(digidocs.url).toBeUndefined();
    expect(screen.getByText('Private application')).toBeInTheDocument();
    expect(
      screen.getByText(
        'DigiDocs dashboard on desktop and mobile, shown using the demo account.'
      )
    ).toBeInTheDocument();
    expect(screen.queryByText(/https?:\/\//i)).toBeNull();
    expect(
      screen.getByRole('link', { name: 'Explore DigiDocs' })
    ).toHaveAttribute('href', '/work/digidocs');
    expect(
      screen.queryByRole('link', { name: /Visit the live site/i })
    ).toBeNull();
    expect(screen.queryByText(/squires/i)).toBeNull();

    unmount();
    render(<ProjectCard project={itrader} />);

    expect(screen.getByText('itrader.im')).toBeInTheDocument();
    expect(screen.queryByText('Private application')).toBeNull();
    expect(
      projects
        .filter(project => project.slug !== 'digidocs')
        .every(project => project.url?.startsWith('https://'))
    ).toBe(true);
  });

  it('includes DigiDocs in the sitemap and uses the real dashboard image', () => {
    const urls = sitemap().map(entry => entry.url);
    expect(urls).toContain('https://development.mpdee.co.uk/work/digidocs');
    expect(urls.some(url => /digidocs\.mpdee/i.test(url))).toBe(false);

    const imagePath = path.join(
      process.cwd(),
      'public/images/work/digidocs-desktop-mobile.webp'
    );
    const bytes = readFileSync(imagePath);
    expect(bytes.subarray(0, 4).toString('ascii')).toBe('RIFF');
    expect(bytes.subarray(8, 12).toString('ascii')).toBe('WEBP');
    expect(
      existsSync(
        path.join(process.cwd(), 'public/images/work/digidocs-illustrative.svg')
      )
    ).toBe(false);

    const digidocs = projects.find(project => project.slug === 'digidocs');
    expect(digidocs?.image).toBe('/images/work/digidocs-desktop-mobile.webp');
    expect(digidocs?.url).toBeUndefined();
    expect(digidocs?.imageCaption).toBe(
      'DigiDocs dashboard on desktop and mobile, shown using the demo account.'
    );
    expect(digidocs?.imageAlt).not.toMatch(/https?:\/\//i);
    expect(digidocs?.imageCaption).not.toMatch(/https?:\/\//i);
  });
});
