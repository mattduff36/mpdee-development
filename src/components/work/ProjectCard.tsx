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
  compact?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  compact = false,
}) => {
  return (
    <Column fillWidth gap={compact ? 's' : 'm'}>
      <Carousel
        className={
          compact
            ? 'project-carousel-trimmed project-carousel-compact'
            : 'project-carousel-trimmed'
        }
        sizes={
          compact
            ? '(max-width: 480px) 100vw, 50vw'
            : '(max-width: 960px) 100vw, 960px'
        }
        indicator="line"
        aspectRatio={compact ? '4 / 3' : '16 / 9'}
        items={project.images.map(image => ({
          slide: image,
          alt: `${project.title} screenshot`,
        }))}
      />
      <Column
        fillWidth
        paddingX={compact ? '4' : '8'}
        gap={compact ? '8' : '12'}
      >
        <Heading
          as="h2"
          variant={compact ? 'heading-strong-m' : 'heading-strong-l'}
          wrap="balance"
        >
          {project.title}
        </Heading>

        <Text
          variant={compact ? 'body-default-s' : 'body-default-m'}
          onBackground="neutral-weak"
        >
          {project.shortDescription}
        </Text>

        <Row gap="8" wrap>
          {project.tags.map(tag => (
            <Tag
              key={tag}
              size={compact ? 's' : 'l'}
              variant="neutral"
              label={tag}
            />
          ))}
          {!compact &&
            project.technologies
              .slice(0, 4)
              .map(tech => (
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
