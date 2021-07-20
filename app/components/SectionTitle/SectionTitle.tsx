import React, { FC } from 'react';
import { View, Text, WithStylesProps, LineAwesome, ViewProps } from 'wiloke-react-core';
import { SectionTitleLoading } from './SectionTitleLoading';

export interface SectionTitleProps extends Pick<WithStylesProps, 'nightModeBlacklist'> {
  /** Title text */
  title: string;
  /** Bật icon arrow phía bên phải */
  arrowEnabled?: boolean;
  css?: ViewProps['css'];
}

interface SectionTitleStatic {
  Loading: typeof SectionTitleLoading;
}

const SectionTitle: FC<SectionTitleProps> & SectionTitleStatic = ({ title, nightModeBlacklist, arrowEnabled = false, css }) => {
  return (
    <View css={css}>
      <View css={{ display: 'inline-flex', alignItems: 'center' }} color="gray9" colorHover="primary" nightModeBlacklist={nightModeBlacklist}>
        <Text tagName="h2" size={22} color="inherit">
          {title}
        </Text>
        {arrowEnabled && <LineAwesome name="angle-right" color="inherit" size={22} css={{ marginLeft: '4px' }} />}
      </View>
    </View>
  );
};

SectionTitle.Loading = SectionTitleLoading;

export { SectionTitle };
