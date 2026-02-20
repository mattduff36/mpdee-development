import {
  Card,
  Column,
  Flex,
  Grid,
  Heading,
  Icon,
  Row,
  Tag,
  Text,
  SmartLink,
} from '@once-ui-system/core';
import { servicePackages } from '@/resources';

export function ServiceHighlights() {
  const highlighted = servicePackages.filter(
    s => !s.isComingSoon && !s.isPartnership
  );

  return (
    <Grid columns="2" s={{ columns: '1' }} gap="16">
      {highlighted.map(pkg => (
        <SmartLink key={pkg.id} href={`/services#${pkg.id}`} fillWidth>
          <Card
            fillWidth
            padding="24"
            radius="l"
            border={pkg.isPopular ? 'brand-alpha-medium' : 'neutral-alpha-weak'}
            cursor="interactive"
          >
            <Column gap="16" fillWidth>
              <Row gap="8" vertical="center">
                <Heading as="h3" variant="heading-strong-m">
                  {pkg.title}
                </Heading>
                {pkg.isPopular && <Tag size="s" label="Popular" />}
              </Row>
              {pkg.price && (
                <Text variant="heading-strong-l" onBackground="brand-strong">
                  {pkg.price}
                </Text>
              )}
              <Text variant="body-default-s" onBackground="neutral-weak">
                {pkg.description}
              </Text>
              <Flex horizontal="start" vertical="center" gap="4">
                <Text variant="body-default-s">Learn more</Text>
                <Icon name="arrowRight" size="xs" onBackground="neutral-weak" />
              </Flex>
            </Column>
          </Card>
        </SmartLink>
      ))}
    </Grid>
  );
}
