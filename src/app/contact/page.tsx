import {
  Column,
  Grid,
  Heading,
  Text,
  Card,
  Icon,
  SmartLink,
} from '@once-ui-system/core';
import { contact as contactPage, contactChannels } from '@/resources';
import { ContactForm } from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: contactPage.title,
  description: contactPage.description,
};

export default function Contact() {
  return (
    <Column maxWidth="m" horizontal="center" gap="xl" fillWidth>
      <Column gap="m" paddingBottom="l" style={{ paddingTop: '80px' }}>
        <Heading variant="display-strong-s" as="h1">
          Get in{' '}
          <Text
            as="span"
            variant="display-strong-s"
            className="brand-gradient-text"
          >
            Touch
          </Text>
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          wrap="balance"
        >
          Ready to start your project? Let&apos;s discuss how we can help bring
          your vision to life.
        </Text>
      </Column>

      <Grid columns="3" s={{ columns: '1' }} gap="16">
        {contactChannels.map(channel => (
          <Card
            key={channel.title}
            fillWidth
            padding="24"
            radius="l"
            border="neutral-alpha-weak"
          >
            <Column gap="8" horizontal="center" fillWidth>
              <Icon
                name={channel.icon}
                size="m"
                style={{ color: 'var(--scheme-orange-700)' }}
              />
              <Text variant="label-strong-m">{channel.title}</Text>
              <Text
                variant="body-default-s"
                onBackground="neutral-weak"
                align="center"
              >
                {channel.title === 'Email' ? (
                  <SmartLink href={`mailto:${channel.detail}`}>
                    {channel.detail}
                  </SmartLink>
                ) : (
                  channel.detail
                )}
              </Text>
            </Column>
          </Card>
        ))}
      </Grid>

      <Column fillWidth gap="l">
        <Column gap="4">
          <Heading as="h2" variant="heading-strong-l">
            Send us a message
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Whether you need a simple website or a complex web application,
            we&apos;ll work with you every step of the way.
          </Text>
        </Column>
        <ContactForm />
      </Column>
    </Column>
  );
}
