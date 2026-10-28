'use client';
import { useState } from 'react';
import type { StudioProject } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
const filters = ['All work', 'Websites', 'Platforms'] as const;
export function ProjectExplorer({ projects }: { projects: StudioProject[] }) {
  const [active, setActive] = useState<(typeof filters)[number]>('All work');
  const visible =
    active === 'All work'
      ? projects
      : projects.filter(project => project.category === active);
  return (
    <>
      <div className="work-toolbar">
        <div className="work-filters" aria-label="Filter projects">
          {filters.map(filter => (
            <button
              key={filter}
              type="button"
              aria-pressed={active === filter}
              className={active === filter ? 'is-active' : ''}
              onClick={() => setActive(filter)}
            >
              {filter}
              <span>
                {filter === 'All work'
                  ? projects.length
                  : projects.filter(p => p.category === filter).length}
              </span>
            </button>
          ))}
        </div>
        <span className="eyebrow result-count" role="status">
          {visible.length} projects to explore
        </span>
      </div>
      <div className="project-grid">
        {visible.map(project => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={projects.indexOf(project)}
          />
        ))}
      </div>
    </>
  );
}
