import React, { FC, RefAttributes } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import * as css from './styles';

export interface BoxProps extends ViewProps {
  variant?: 'border' | 'border2' | 'shadow';
  innerRef?: RefAttributes<HTMLElement>['ref'];
}

const Box: FC<BoxProps> = ({ children, radius = 10, className, innerRef, ...rest }) => {
  return (
    <View
      {...rest}
      css={[css.container, rest.css]}
      ref={innerRef}
      className={className}
      radius={radius}
      backgroundColor="light"
      borderColor="gray2"
      borderStyle="solid"
      borderWidth={1}
    >
      {children}
    </View>
  );
};

export { Box };
