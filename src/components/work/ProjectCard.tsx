'use client';

import {
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Tag,
  Text,
  Row,
} from '@once-ui-system/core';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Column fillWidth gap="m">
      <Carousel
        className="project-carousel-trimmed"
        sizes="(max-width: 960px) 100vw, 960px"
        indicator="line"
        aspectRatio="16 / 9"
        items={project.images.map(image => ({
          slide: image,
          alt: `${project.title} screenshot`,
        }))}
      />
      <Column fillWidth paddingX="8" gap="12">
        <Heading as="h2" variant="heading-strong-l" wrap="balance">
          {project.title}
        </Heading>

        <Text variant="body-default-m" onBackground="neutral-weak">
          {project.shortDescription}
        </Text>

        <Row gap="8" wrap>
          {project.tags.map(tag => (
            <Tag key={tag} size="l" variant="neutral" label={tag} />
          ))}
          {project.technologies.slice(0, 4).map(tech => (
            <Tag key={tech} size="s" variant="neutral" label={tech} />
          ))}
        </Row>

        <Flex gap="16" paddingTop="4">
          {project.liveUrl && (
            <SmartLink
              href={project.liveUrl}
              suffixIcon="arrowUpRight"
              iconSize="xs"
            >
              <Text variant="body-default-s">View project</Text>
            </SmartLink>
          )}
        </Flex>
      </Column>
    </Column>
  );
};
