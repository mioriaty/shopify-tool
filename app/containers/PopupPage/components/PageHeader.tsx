import { i18n } from 'app/translation';
import { FC } from 'react';
import { Text, View } from 'wiloke-react-core';
import { ButtonCreatePopup } from './ButtonCreatePopup';

interface PageHeaderProps {}

const PageHeader: FC<PageHeaderProps> = () => {
  return (
    <View className="popup__header" row css={{ alignItems: 'center' }}>
      <View columns={[12, 8, 8]}>
        <Text color="gray9" size={28} css={{ fontWeight: 600, lineHeight: '42px' }}>
          {i18n.t('popup')}
        </Text>
        <Text color="gray6" size={14} css={{ fontWeight: 400, lineHeight: '20px' }}>
          {i18n.t('popupSectionDescription')}
        </Text>
      </View>
      <View columns={[12, 4, 4]} css={{ textAlign: 'right' }}>
        <ButtonCreatePopup />
      </View>
      <View height={1} backgroundColor="gray3" css={{ width: '100%', margin: '20px 0' }} />
    </View>
  );
};

export { PageHeader };
