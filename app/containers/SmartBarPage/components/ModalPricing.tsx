import { ModalAntd } from 'app/components/ModalAntd';
import { pricingSelector } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useTheme, View } from 'wiloke-react-core';

interface ModalPricingProps {
  show?: boolean;
}

const ModalPricing: FC<ModalPricingProps> = ({ show = false }) => {
  const { colors } = useTheme();
  const history = useHistory();
  const planState = useSelector(pricingSelector.plans);

  const [modalVisible, setModalVisible] = useState(show);

  useEffect(() => {
    setModalVisible(show);
  }, [show]);

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    history.push({
      state: undefined,
      pathname: '/pricing',
    });
    setModalVisible(false);
  };

  return (
    <View>
      <ModalAntd
        visible={modalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{ style: { backgroundColor: colors.gray8 } }}
        title={''}
        okText={i18n.t('upgradeNow')}
      >
        {i18n.t('modalPricingMessage', { p: planState.plans })}
      </ModalAntd>
    </View>
  );
};

export { ModalPricing };
