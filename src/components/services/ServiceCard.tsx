'use client';

import {
  Card,
  Column,
  Heading,
  Row,
  Tag,
  Text,
  Button,
  Line,
  Icon,
  Flex,
} from '@once-ui-system/core';
import { ServicePackage } from '@/types';

interface ServiceCardProps {
  service: ServicePackage;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card
      fillWidth
      padding="32"
      radius="l"
      border={service.isPopular ? 'brand-alpha-medium' : 'neutral-alpha-weak'}
      direction="column"
      gap="20"
    >
      {service.isPopular && (
        <Flex horizontal="end" fillWidth>
          <Tag size="s" label="Most Popular" />
        </Flex>
      )}

      <Column gap="12" fillWidth>
        <Row gap="12" vertical="center" wrap>
          <Heading as="h3" variant="heading-strong-l">
            {service.title}
          </Heading>
          {service.isComingSoon && <Tag size="s" label="Coming Soon" />}
          {service.isPartnership && <Tag size="s" label="Partnership" />}
        </Row>

        {service.price && (
          <Text variant="display-strong-s" onBackground="brand-strong">
            {service.price}
          </Text>
        )}

        <Text variant="body-default-m" onBackground="neutral-weak">
          {service.description}
        </Text>
      </Column>

      <Line />

      <Column gap="8" fillWidth>
        <Text variant="label-strong-s" onBackground="neutral-strong">
          What&apos;s included
        </Text>
        {service.details.map((detail, index) => (
          <Row key={index} gap="8" vertical="start">
            <Icon
              name="check"
              size="xs"
              onBackground="brand-strong"
              style={{ flexShrink: 0, marginTop: 2 }}
            />
            <Text variant="body-default-s" onBackground="neutral-weak">
              {detail}
            </Text>
          </Row>
        ))}
      </Column>

      <Line />

      <Row gap="8" wrap>
        {service.technologies.map(tech => (
          <Tag key={tech} size="s" variant="neutral" label={tech} />
        ))}
      </Row>

      {!service.isComingSoon && (
        <Button
          href="/contact"
          variant={service.isPopular ? 'primary' : 'secondary'}
          fillWidth
          size="l"
        >
          Get Started
        </Button>
      )}
    </Card>
  );
}
