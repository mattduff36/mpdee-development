import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { projectBrowserLabel, projects } from '@/data/projects';
import { Arrow, SectionLabel } from '@/components/studio/Marks';
import { ContactCta } from '@/components/studio/ContactCta';
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: '/work/' + project.slug },
    openGraph: { images: [{ url: project.image, alt: project.imageAlt }] },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  const nextProject =
    projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <article className="container case-study">
        <header className="case-header">
          <Link href="/work" className="back-link">
            ← All work
          </Link>
          <div className="eyebrow">
            {project.category} / {project.sector}
          </div>
          <h1>
            {project.title}
            <span className="accent-dot">.</span>
          </h1>
          <p>{project.headline}</p>
          <div className="case-meta">
            <div className="tag-list">
              {project.services.map(service => (
                <span key={service}>{service}</span>
              ))}
            </div>
            {project.url ? (
              <a
                className="text-link"
                href={project.url}
                target="_blank"
                rel="noreferrer"
              >
                Visit the live site <Arrow />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <span className="private-application-label">
                Private application
              </span>
            )}
          </div>
        </header>
        <div className="case-image" style={{ backgroundColor: project.colour }}>
          <div className="browser-frame">
            <div className="browser-bar">
              <span />
              <span />
              <span />
              <small>{projectBrowserLabel(project.url)}</small>
            </div>
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={1400}
              height={930}
              sizes="(max-width: 700px) 90vw, 80vw"
              priority
              unoptimized={project.image.endsWith('.svg')}
            />
          </div>
          {project.imageCaption ? (
            <p className="case-image-caption">{project.imageCaption}</p>
          ) : null}
        </div>
        <div className="case-overview">
          <div>
            <SectionLabel number="01">The project</SectionLabel>
            <h2>{project.headline}</h2>
          </div>
          <div>
            <p className="large-copy">{project.description}</p>
            <h3>The starting point</h3>
            <p>{project.challenge}</p>
            <h3>The approach</h3>
            <p>{project.approach}</p>
          </div>
        </div>
        <div className="case-features">
          <SectionLabel number="02">What it brings together</SectionLabel>
          <ul>
            {project.features.map((feature, index) => (
              <li key={feature}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {feature}
                <Arrow />
              </li>
            ))}
          </ul>
        </div>
        <Link className="next-project" href={'/work/' + nextProject.slug}>
          <span className="eyebrow">Up next</span>
          <strong>{nextProject.title}</strong>
          <Arrow />
        </Link>
      </article>
      <ContactCta />
    </>
  );
}
