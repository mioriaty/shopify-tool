import { Button } from 'app/components/Button';
import { Section } from 'app/components/Section';
import { i18n } from 'app/translation';
import { FC, ReactNode } from 'react';
import { Text, View } from 'wiloke-react-core';

export interface EmptyPageProps {
  /* Title của page */
  title?: string;
  /* Mô tả của page */
  description?: string;
  /* ButtonCreate Component */
  ButtonCreate?: ReactNode;
}

const EmptyPage: FC<EmptyPageProps> = ({
  title = 'Popup',
  description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eum non deleniti, doloremque dolorum,',
  ButtonCreate = (
    <Button size="large" radius={10}>
      {i18n.t('createBadge')}
    </Button>
  ),
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
        <Text></Text>
        <View css={{ display: 'flex' }}>
          <View css={{ marginRight: '10px' }}>{ButtonCreate}</View>
          <Button backgroundColor="gray2" color="gray8" size="large" radius={10}>
            {i18n.t('videoTutorial')}
          </Button>
        </View>
      </View>
    </Section>
  );
};

export { EmptyPage };
