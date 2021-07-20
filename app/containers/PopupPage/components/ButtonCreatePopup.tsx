import { Input } from 'antd';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Button } from 'app/components/Button';
import { ModalAntd } from 'app/components/ModalAntd';
import { useActionRemoveIdEditing } from 'app/containers/PopupPage/actions/actionIdEditing';
import { useFirebaseRemove } from 'app/hooks/useFirebaseRemove';
import { useIframeLoaded } from 'app/hooks/useIframeLoaded';
import useInfo from 'app/hooks/useInfo';
import { ClientStatisticDetailModel } from 'app/services/PopupService';
import { authSelectors, popupPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { CONFIG_SETTING_URL } from 'app/types/configSetting';
import { pmParent } from 'app/utils/constants/postmessage';
import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useTheme, View } from 'wiloke-react-core';
import { useActionAddConfig, useActionEditConfig, useDraftConfig } from '../actions/actionConfig';
import { useCreateNamePopup } from '../actions/actionStatisticPopup';

interface ButtonCreateNewProps {}

const ButtonCreatePopup: FC<ButtonCreateNewProps> = () => {
  // selectors
  const statisticState = useSelector(popupPageSelectors.statisticData);
  const namePopup = useSelector(popupPageSelectors.title);
  const idEditingState = useSelector(popupPageSelectors.idEditing);
  const shopName = useSelector(authSelectors.shopName);
  const draftItem = useSelector(popupPageSelectors.draftItem);
  const pages = useSelector(authSelectors.pages);

  // dispatcher
  const removeIdEditing = useActionRemoveIdEditing();
  const setDraftConfig = useDraftConfig();
  const setNamePopup = useCreateNamePopup();
  const createConfig = useActionAddConfig();
  const updateConfig = useActionEditConfig();
  const location = useLocation<'/popup'>();

  // hooks
  const { loaded, setLoaded } = useIframeLoaded();
  const { colors } = useTheme();
  const [form] = useForm();
  const { handleRemove } = useFirebaseRemove();
  const { accessToken, userPackage, discounts } = useInfo();

  // state
  const [modalVisible, setModalVisible] = useState(false);
  // const [pricingModalVisible, setPricingModalVisible] = useState(false);
  const [isCreate, setCreate] = useState(false);
  const inputRef = useRef<Input>(null);
  const pmRef = useRef<(() => void) | undefined>();

  useEffect(() => {
    if (location.state?.message) {
      setModalVisible(true);
    }
  }, [location]);

  // gửi user info khi create popup
  useEffect(() => {
    if (loaded && namePopup && isCreate) {
      pmParent.emit('@createPopup', undefined);
      if (discounts && userPackage && accessToken && shopName && draftItem && pages) {
        pmParent.emit('@sendInfo', {
          campaignId: draftItem.id,
          accessToken,
          discounts,
          userPackage,
          shopName,
          pages,
        });
      }
      setCreate(false);
      setLoaded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, draftItem, discounts, userPackage, accessToken, shopName, isCreate, pages]);

  useEffect(() => {
    pmRef.current = pmParent.on('@saveAndPublish', payload => {
      if (!!draftItem) {
        updateConfig.request({ id: draftItem.id, config: payload.result });
        const addedData = statisticState.data.find(item => item.config === payload.result) as ClientStatisticDetailModel;
        if (addedData) {
          handleRemove(addedData.id);
        }
        // setPricingModalVisible(true);
        setDraftConfig(payload.result);
      }
    });

    return () => {
      pmRef.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftItem]);

  // auto focus input when modal visible
  useEffect(() => {
    if (modalVisible) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.focus();
      form.resetFields(['name']);
    }
  }, [form, modalVisible]);

  const handleCreate = () => {
    if (!!namePopup && !idEditingState) {
      removeIdEditing();
      createConfig.request({ config: {}, name: namePopup });
      pmParent.setPopup(CONFIG_SETTING_URL);
      pmParent.emit('@createPopup', undefined);
      setCreate(true);
      setModalVisible(false);
    }
    form.resetFields(['name']);
  };

  const handleClick = () => {
    setNamePopup('');
    setModalVisible(true);
    removeIdEditing();
    setCreate(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setNamePopup('');
    form.resetFields(['name']);
  };

  return (
    <View>
      <Button
        size="large"
        radius={10}
        disabled={statisticState.createItemStatus === 'loading'}
        loading={statisticState.createItemStatus === 'loading'}
        onClick={handleClick}
      >
        {i18n.t('createNewPopup')}
      </Button>

      <ModalAntd
        visible={modalVisible}
        onCancel={handleCancel}
        onOk={form.submit}
        okButtonProps={{ style: { backgroundColor: colors.gray8 } }}
        title={i18n.t('enterPopupName')}
        okText={i18n.t('createNewPopup')}
      >
        <Form
          form={form}
          onFinish={handleCreate}
          onValuesChange={changedValues => {
            setNamePopup(changedValues.name);
          }}
          onSubmitCapture={handleCreate}
        >
          <FormItem name="name" rules={[{ required: true, message: i18n.t('pleaseEnterPopupName') }]}>
            <Input autoFocus size="large" style={{ borderRadius: 6, fontSize: 14, padding: 11 }} ref={inputRef} />
          </FormItem>
        </Form>
      </ModalAntd>
      {/* modal pricing */}
      {/* <ModalPricing show={pricingModalVisible} /> */}
    </View>
  );
};

export { ButtonCreatePopup };
