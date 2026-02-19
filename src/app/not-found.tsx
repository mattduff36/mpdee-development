import { Column, Heading, Text, Button } from '@once-ui-system/core';

export default function NotFound() {
  return (
    <Column
      fillWidth
      horizontal="center"
      vertical="center"
      paddingY="xl"
      gap="24"
    >
      <Heading variant="display-strong-l" align="center">
        404
      </Heading>
      <Text
        variant="heading-default-l"
        onBackground="neutral-weak"
        align="center"
      >
        Page not found
      </Text>
      <Text
        variant="body-default-m"
        onBackground="neutral-weak"
        align="center"
        wrap="balance"
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Text>
      <Button href="/" variant="secondary" size="l">
        Back to Home
      </Button>
    </Column>
  );
}
