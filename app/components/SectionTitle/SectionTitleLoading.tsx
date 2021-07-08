import React, { FC } from 'react';
import { View, ViewProps, ColorNames } from 'wiloke-react-core';

export interface SectionTitleLoadingProps extends Pick<ViewProps, 'nightModeBlacklist'> {
  /** Màu của loading */
  color?: ColorNames;
}

const SectionTitleLoading: FC<SectionTitleLoadingProps> = ({ nightModeBlacklist, color = 'gray4' }) => {
  return (
    <View
      css={{ marginBottom: '12px', height: '20px', width: '50px', borderRadius: '6px' }}
      backgroundColor={color}
      nightModeBlacklist={nightModeBlacklist}
    />
  );
};

export { SectionTitleLoading };
