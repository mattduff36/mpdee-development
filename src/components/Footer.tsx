import { Row, IconButton, SmartLink, Text, Flex } from '@once-ui-system/core';
import { company, social } from '@/resources';
import styles from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row
      as="footer"
      fillWidth
      padding="8"
      horizontal="center"
      className={styles.footer}
    >
      <Flex
        maxWidth="l"
        fillWidth
        paddingY="12"
        paddingX="16"
        horizontal="between"
        vertical="center"
        gap="16"
        s={{ direction: 'column' }}
      >
        <Text variant="body-default-s" onBackground="neutral-weak">
          &copy; {currentYear} /{' '}
          <SmartLink href={`https://${company.domain}`}>
            {company.name}
          </SmartLink>
        </Text>
        <Row gap="8">
          {social
            .filter(item => item.essential && item.link)
            .map(item => (
              <IconButton
                key={item.name}
                href={item.link}
                icon={item.icon}
                variant="ghost"
                size="s"
                tooltip={item.name}
              />
            ))}
        </Row>
      </Flex>
    </Row>
  );
};
