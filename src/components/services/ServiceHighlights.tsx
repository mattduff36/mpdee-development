import {
  Card,
  Column,
  Grid,
  Heading,
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
        <Card
          key={pkg.id}
          fillWidth
          padding="24"
          radius="l"
          border={pkg.isPopular ? 'brand-alpha-medium' : 'neutral-alpha-weak'}
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
            <SmartLink href="/services" suffixIcon="arrowRight" iconSize="xs">
              <Text variant="body-default-s">Learn more</Text>
            </SmartLink>
          </Column>
        </Card>
      ))}
    </Grid>
  );
}
