import { FC } from 'react';
import { View } from 'wiloke-react-core';
import AntdPopover, { PopoverProps as AntdPopoverProps } from 'antd/lib/popover';
import * as style from './styles';

export interface PopoverProps extends AntdPopoverProps {}

const Popover: FC<PopoverProps> = ({ ...rest }) => {
  return (
    <View css={style.container}>
      <AntdPopover {...rest} trigger="click" />
    </View>
  );
};

export { Popover };
