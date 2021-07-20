import React, { FC } from 'react';
import { ColorNames, Radius, View } from 'wiloke-react-core';
import { SizeIconBox } from './IconBox';
import * as css from './styles';
export interface IconBoxLoadingProps {
  /** radius */
  radius?: Radius;
  /** size */
  size?: SizeIconBox;
  /** color */
  color?: ColorNames;
}

const IconBoxLoading: FC<IconBoxLoadingProps> = ({ radius = 6, size = 'large', color = 'gray4' }) => {
  return <View css={css.container(size)} backgroundColor={color} radius={radius}></View>;
};

export { IconBoxLoading };
