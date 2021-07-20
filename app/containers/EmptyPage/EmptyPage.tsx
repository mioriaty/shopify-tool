import { Button } from 'app/components/Button';
import { Section } from 'app/components/Section';
import { i18n } from 'app/translation';
import { FC } from 'react';
import { Text, View } from 'wiloke-react-core';

export interface EmptyPageProps {
  /* Title của page */
  title?: string;
  /* Mô tả của page */
  description?: string;
}

const EmptyPage: FC<EmptyPageProps> = ({
  title = 'Popup',
  description = `Using Popups is an excellent way to collect emails and introduce your sale campaign to customers. Click on the button Create Popup below to get started now!`,
  children,
}) => {
  return (
    <Section>
      <View css={{ maxWidth: '440px', width: '100%', margin: '0 auto' }}>
        <Text size={20} color="gray8" css={{ fontWeight: 600, lineHeight: '30px', marginBottom: '9px' }}>
          {title}
        </Text>
        <Text size={14} color="gray6" css={{ lineHeight: '20px', marginBottom: '40px' }}>
          {description}
        </Text>
        <View css={{ display: 'flex' }}>
          <View css={{ marginRight: '10px' }}>{children}</View>
          <Button backgroundColor="gray2" color="gray8" size="large" radius={10}>
            {i18n.t('videoTutorial')}
          </Button>
        </View>
      </View>
    </Section>
  );
};

export { EmptyPage };
