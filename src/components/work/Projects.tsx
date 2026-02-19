import { Column } from '@once-ui-system/core';
import { ProjectCard } from '@/components';
import { projects } from '@/resources';

interface ProjectsProps {
  range?: [number, number?];
}

export function Projects({ range }: ProjectsProps) {
  const displayedProjects = range
    ? projects.slice(range[0] - 1, range[1] ?? projects.length)
    : projects;

  return (
    <Column fillWidth gap="xl">
      {displayedProjects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Column>
  );
}
