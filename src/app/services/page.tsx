import { Column, Heading, Text, Button } from '@once-ui-system/core';
import { services as servicesPage, servicePackages } from '@/resources';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ScrollToHash } from '@/components/ScrollToHash';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: servicesPage.title,
  description: servicesPage.description,
};

export default function Services() {
  const websitePackages = servicePackages.filter(
    s => !s.isComingSoon && !s.isPartnership
  );
  const otherServices = servicePackages.filter(
    s => s.isComingSoon || s.isPartnership
  );

  return (
    <Column maxWidth="m" horizontal="center" gap="xl" fillWidth>
      <ScrollToHash />
      <Column gap="m" paddingBottom="l" style={{ paddingTop: '80px' }}>
        <Heading variant="display-strong-s" as="h1">
          Services &{' '}
          <Text
            as="span"
            variant="display-strong-s"
            className="brand-gradient-text"
          >
            Pricing
          </Text>
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          wrap="balance"
        >
          Comprehensive web solutions tailored to your business needs, from
          initial concept to final deployment. Choose the package that fits your
          requirements.
        </Text>
      </Column>

      <Column fillWidth gap="24">
        {websitePackages.map(pkg => (
          <Column
            key={pkg.id}
            id={pkg.id}
            fillWidth
            style={{ scrollMarginTop: '108px' }}
          >
            <ServiceCard service={pkg} />
          </Column>
        ))}
      </Column>

      {otherServices.length > 0 && (
        <Column fillWidth gap="24">
          <Heading as="h2" variant="heading-strong-l">
            Additional Services
          </Heading>
          {otherServices.map(pkg => (
            <Column
              key={pkg.id}
              id={pkg.id}
              fillWidth
              style={{ scrollMarginTop: '108px' }}
            >
              <ServiceCard service={pkg} />
            </Column>
          ))}
        </Column>
      )}

      <Column fillWidth gap="m" horizontal="center" paddingY="l">
        <Heading as="h2" variant="heading-strong-l" align="center">
          Not sure which package is right for you?
        </Heading>
        <Text
          variant="body-default-m"
          onBackground="neutral-weak"
          align="center"
          wrap="balance"
        >
          Get in touch for a free, no-obligation consultation. We&apos;ll help
          you find the perfect solution for your business.
        </Text>
        <Button href="/contact" variant="primary" size="l">
          Book a Free Consultation
        </Button>
      </Column>
    </Column>
  );
}
