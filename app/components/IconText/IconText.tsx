import React, { FC } from 'react';
import { LineAwesome, LineAwesomeName, Text, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface IconTextProps {
  iconName: LineAwesomeName;
  title: string;
  text: string;
  active?: boolean;
  css?: ViewProps['css'];
}

const IconText: FC<IconTextProps> = ({ iconName, title, text, active = false, css }) => {
  return (
    <View radius={16} backgroundColor="light" css={[styles.container(active), css]}>
      <LineAwesome name={iconName} size={50} color="primary" css={styles.icon} />
      <Text tagName="h2" size={16} css={{ marginBottom: '8px' }}>
        {title}
      </Text>
      <Text>{text}</Text>
    </View>
  );
};

export { IconText };
