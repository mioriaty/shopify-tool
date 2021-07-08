import Modal, { ModalProps } from 'antd/lib/modal';
import { FC } from 'react';
import { LineAwesome, useStyleSheet, useTheme } from 'wiloke-react-core';
import * as style from './styles';

export interface ModalAntdProps extends ModalProps {}

const ModalAntd: FC<ModalAntdProps> = ({ ...rest }) => {
  const { colors } = useTheme();
  const { styles } = useStyleSheet(colors);

  return (
    <Modal
      {...rest}
      closeIcon={
        <LineAwesome
          name="close"
          size={24}
          color="gray9"
          css={{
            lineHeight: '24px',
          }}
        />
      }
      className={styles(style.container)}
    />
  );
};

export { ModalAntd };
