import { FC } from 'react';
import { Text, View } from 'wiloke-react-core';
import { ButtonCreatePopup } from './ButtonCreatePopup';

interface PageHeaderProps {}

const PageHeader: FC<PageHeaderProps> = () => {
  return (
    <View className="popup__header" row css={{ alignItems: 'center' }}>
      <View columns={[12, 6, 6]}>
        <Text color="gray9" size={28} css={{ fontWeight: 600, lineHeight: '42px' }}>
          Popup
        </Text>
        <Text color="gray6" size={14} css={{ fontWeight: 400, lineHeight: '20px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </View>
      <View columns={[12, 6, 6]} css={{ textAlign: 'right' }}>
        <ButtonCreatePopup />
      </View>
      <View height={1} backgroundColor="gray3" css={{ width: '100%', margin: '20px 0' }} />
    </View>
  );
};

export { PageHeader };
