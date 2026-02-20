import { Column, Grid } from '@once-ui-system/core';
import { ProjectCard } from '@/components';
import { projects } from '@/resources';

interface ProjectsProps {
  range?: [number, number?];
  ids?: string[];
  variant?: 'list' | 'grid';
}

export function Projects({ range, ids, variant = 'list' }: ProjectsProps) {
  const displayedProjects = ids
    ? projects.filter(p => ids.includes(p.id))
    : range
      ? projects.slice(range[0] - 1, range[1] ?? projects.length)
      : projects;

  const isGrid = variant === 'grid';

  if (isGrid) {
    return (
      <Grid fillWidth columns={2} gap="l" s={{ columns: 1 }}>
        {displayedProjects.map(project => (
          <ProjectCard key={project.id} project={project} compact />
        ))}
      </Grid>
    );
  }

  return (
    <Column fillWidth gap="xl">
      {displayedProjects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Column>
  );
}
