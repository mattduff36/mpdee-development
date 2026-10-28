import Link from 'next/link';
import Image from 'next/image';
import { projectBrowserLabel, type StudioProject } from '@/data/projects';
import { Arrow } from './Marks';
export function ProjectCard({
  project,
  index = 0,
  priority = false,
}: {
  project: StudioProject;
  index?: number;
  priority?: boolean;
}) {
  return (
    <article className="project-card">
      <Link
        href={'/work/' + project.slug}
        className="project-link"
        aria-label={'Explore ' + project.title}
      >
        <div
          className="project-canvas"
          style={{ backgroundColor: project.colour }}
        >
          <span className="canvas-caption">
            {project.category === 'Platforms'
              ? 'DIGITAL PLATFORM'
              : 'WEBSITE DESIGN'}
          </span>
          <div className="browser-frame">
            <div className="browser-bar">
              <span />
              <span />
              <span />
              <small>{projectBrowserLabel(project.url, true)}</small>
            </div>
            <div className="project-screen">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 700px) 90vw, 45vw"
                priority={priority}
                unoptimized={project.image.endsWith('.svg')}
              />
            </div>
          </div>
          <span className="project-open">
            <Arrow />
          </span>
        </div>
        {project.imageCaption ? (
          <p className="project-image-caption">{project.imageCaption}</p>
        ) : null}
        <div className="project-meta">
          <div>
            <span className="eyebrow">
              {String(index + 1).padStart(2, '0')} / {project.sector}
            </span>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
          </div>
          <Arrow />
        </div>
      </Link>
    </article>
  );
}
