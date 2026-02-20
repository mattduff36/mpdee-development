import {
  Heading,
  Text,
  Button,
  RevealFx,
  Column,
  Row,
  Line,
  Flex,
  SmartLink,
} from '@once-ui-system/core';
import { home, company, routes } from '@/resources';
import { Projects } from '@/components/work/Projects';
import { ServiceHighlights } from '@/components/services/ServiceHighlights';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
};

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: company.name,
            url: `https://${company.subdomain}`,
            logo: `https://${company.subdomain}${company.logo}`,
            description: home.description,
            areaServed: {
              '@type': 'Country',
              name: 'United Kingdom',
            },
          }),
        }}
      />

      <Column
        fillWidth
        paddingBottom="l"
        gap="m"
        horizontal="center"
        style={{ paddingTop: '80px' }}
      >
        <RevealFx translateY="4" fillWidth horizontal="center">
          <Column horizontal="center" gap="8">
            <Heading
              variant="display-strong-xl"
              align="center"
              onBackground="neutral-strong"
            >
              MPDEE{' '}
              <Text
                as="span"
                variant="display-strong-xl"
                className="brand-gradient-text"
              >
                Development
              </Text>
            </Heading>
            <Flex
              className="brand-gradient-bg"
              style={{
                width: '4rem',
                height: '3px',
                borderRadius: '2px',
              }}
            />
          </Column>
        </RevealFx>

        <RevealFx translateY="8" delay={0.1} fillWidth horizontal="center">
          <Column maxWidth="s" horizontal="center">
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-l"
              align="center"
            >
              {company.tagline}
            </Text>
          </Column>
        </RevealFx>

        <RevealFx translateY="12" delay={0.2} fillWidth horizontal="center">
          <Column
            maxWidth="s"
            horizontal="center"
            className="hide-subline-mobile"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="body-default-l"
              align="center"
            >
              {home.subline}
            </Text>
          </Column>
        </RevealFx>

        <RevealFx translateY="16" delay={0.3} fillWidth horizontal="center">
          <Row gap="16" horizontal="center" paddingTop="24">
            <Button href="/contact" variant="primary" size="l">
              Get Started
            </Button>
            <Button href="/work" variant="secondary" size="l">
              View Our Work
            </Button>
          </Row>
        </RevealFx>
      </Column>

      <RevealFx translateY="16" delay={0.4} fillWidth>
        <Line />
      </RevealFx>

      {routes['/services'] && (
        <Column fillWidth gap="l">
          <Column fillWidth gap="4">
            <Flex
              fillWidth
              horizontal="between"
              vertical="end"
              s={{ direction: 'column', horizontal: 'start' }}
            >
              <Column gap="4">
                <Heading as="h2" variant="display-strong-xs">
                  Our{' '}
                  <Text
                    as="span"
                    variant="display-strong-xs"
                    className="brand-gradient-text"
                  >
                    Services
                  </Text>
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Website packages for every business need
                </Text>
              </Column>
              <SmartLink href="/services" suffixIcon="arrowRight" iconSize="xs">
                <Text variant="body-default-s">View all</Text>
              </SmartLink>
            </Flex>
          </Column>
          <ServiceHighlights />
        </Column>
      )}

      <RevealFx translateY="8" fillWidth>
        <Line />
      </RevealFx>

      {routes['/work'] && (
        <Column fillWidth gap="l">
          <Column fillWidth gap="4">
            <Flex
              fillWidth
              horizontal="between"
              vertical="end"
              s={{ direction: 'column', horizontal: 'start' }}
            >
              <Column gap="4">
                <Heading as="h2" variant="display-strong-xs">
                  Featured{' '}
                  <Text
                    as="span"
                    variant="display-strong-xs"
                    className="brand-gradient-text"
                  >
                    Projects
                  </Text>
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  A selection of recent client work
                </Text>
              </Column>
              <SmartLink href="/work" suffixIcon="arrowRight" iconSize="xs">
                <Text variant="body-default-s">View all</Text>
              </SmartLink>
            </Flex>
          </Column>
          <Projects
            ids={[
              'lbp-website',
              'victoria-rose-salon',
              'bouncy-castle-hire',
              'voiceover-studio-finder',
            ]}
            variant="grid"
          />
        </Column>
      )}

      <RevealFx translateY="8" fillWidth>
        <Line />
      </RevealFx>

      <Column fillWidth gap="m" horizontal="center" paddingY="l">
        <Heading as="h2" variant="heading-strong-l" align="center">
          Ready to start your project?
        </Heading>
        <Text
          variant="body-default-m"
          onBackground="neutral-weak"
          align="center"
          wrap="balance"
        >
          Let&apos;s discuss how we can help bring your vision to life.
        </Text>
        <Button href="/contact" variant="primary" size="l">
          Get in Touch
        </Button>
      </Column>
    </Column>
  );
}
