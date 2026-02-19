import { Column, Heading, Text } from '@once-ui-system/core';
import { work } from '@/resources';
import { Projects } from '@/components/work/Projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: work.title,
  description: work.description,
};

export default function Work() {
  return (
    <Column maxWidth="m" horizontal="center" gap="xl" fillWidth>
      <Column gap="m">
        <Heading variant="display-strong-s" as="h1">
          Our{' '}
          <Text
            as="span"
            variant="display-strong-s"
            className="brand-gradient-text"
          >
            Work
          </Text>
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          wrap="balance"
        >
          Explore our portfolio of client projects. Each one represents a unique
          business challenge solved through thoughtful design and modern
          technology.
        </Text>
      </Column>
      <Projects />
    </Column>
  );
}
