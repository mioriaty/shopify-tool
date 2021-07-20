import { Input } from 'antd';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Button } from 'app/components/Button';
import { ModalAntd } from 'app/components/ModalAntd';
import { useFirebaseRemove } from 'app/hooks/useFirebaseRemove';
import { useIframeLoaded } from 'app/hooks/useIframeLoaded';
import useInfo from 'app/hooks/useInfo';
import { ClientSmartBarServiceModel } from 'app/services/SmartBarService';
import { authSelectors, smartBarPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { CONFIG_SETTING_URL } from 'app/types/configSetting';
import { pmParent } from 'app/utils/constants/postmessage';
import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useTheme, View } from 'wiloke-react-core';
import { useActionAddConfig, useActionEditConfig } from '../actions/actionConfig';
import { useActionRemoveIdEditing } from '../actions/actionIdEditing';
import { useCreateNameSmartBar } from '../actions/actionStatisticPopup';

interface ButtonCreateNewProps {}

const ButtonCreateBar: FC<ButtonCreateNewProps> = () => {
  const statisticState = useSelector(smartBarPageSelectors.statisticData);
  const nameSmartBar = useSelector(smartBarPageSelectors.title);
  const idEditing = useSelector(smartBarPageSelectors.idEditing);
  const draftItem = useSelector(smartBarPageSelectors.draftItem);
  const shopName = useSelector(authSelectors.shopName);
  const pages = useSelector(authSelectors.pages);

  const removeIdEditing = useActionRemoveIdEditing();
  const setNameSmartBar = useCreateNameSmartBar();
  const createConfig = useActionAddConfig();
  const updateConfig = useActionEditConfig();
  const location = useLocation<'/smart-banner'>();
  const { accessToken, discounts, userPackage } = useInfo();

  const { colors } = useTheme();
  const [form] = useForm();
  const { loaded, setLoaded } = useIframeLoaded();
  const { handleRemove } = useFirebaseRemove();

  const inputRef = useRef<Input>(null);
  const pmRef = useRef<() => void | undefined>();
  const [isCreate, setCreate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setModalVisible(true);
    }
  }, [location]);

  useEffect(() => {
    if (loaded && isCreate && nameSmartBar) {
      pmParent.emit('@createSmartBar', undefined);

      createConfig.request({
        config: {},
        name: nameSmartBar,
      });

      if (accessToken && discounts && userPackage && shopName && pages && draftItem) {
        pmParent.emit('@sendInfo', {
          accessToken,
          campaignId: draftItem.id,
          discounts,
          shopName,
          userPackage,
          pages,
        });
      }

      setCreate(false);
      setLoaded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, draftItem, accessToken, discounts, userPackage, shopName, nameSmartBar]);

  // Nếu không tồn tại id đang edit thì gọi action create new popup và nhận lại config ới
  useEffect(() => {
    pmRef.current = pmParent.on('@saveAndPublish', payload => {
      if (!!draftItem) {
        updateConfig.request({ id: draftItem.id, config: payload.result });
        const addedData = statisticState.data.find(item => item.config === payload.result) as ClientSmartBarServiceModel;
        if (addedData) {
          handleRemove(addedData.id);
        }
      }
    });

    return () => {
      pmRef.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftItem]);

  // auto focus input when modal visible
  useEffect(() => {
    if (!!modalVisible) {
      inputRef.current?.focus();
    } else {
      form.resetFields(['name']);
    }
  }, [form, modalVisible]);

  const handleCreate = () => {
    if (!!nameSmartBar && !idEditing) {
      console.log({ nameSmartBar, idEditing });

      removeIdEditing();
      pmParent.setPopup(CONFIG_SETTING_URL);
      pmParent.emit('@createSmartBar', undefined);

      setCreate(true);
      setModalVisible(false);
    }
    form.resetFields(['name']);
  };

  return (
    <View>
      <Button
        size="large"
        radius={10}
        disabled={statisticState.createItemStatus === 'loading'}
        loading={statisticState.createItemStatus === 'loading'}
        onClick={() => {
          setNameSmartBar('');
          removeIdEditing();
          setModalVisible(true);
          setCreate(true);
        }}
      >
        {i18n.t('createSmartBar')}
      </Button>

      <ModalAntd
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setNameSmartBar('');
          form.resetFields(['name']);
        }}
        onOk={form.submit}
        okButtonProps={{ style: { backgroundColor: colors.gray8 } }}
        title={i18n.t('enterSmartBarName')}
        okText={i18n.t('createSmartBar')}
      >
        <Form
          form={form}
          onValuesChange={changedValues => {
            setNameSmartBar(changedValues.name);
          }}
          onFinish={handleCreate}
          onSubmitCapture={handleCreate}
        >
          <FormItem name="name" rules={[{ required: true, message: i18n.t('pleaseEnterSmartBarName') }]}>
            <Input size="large" style={{ borderRadius: 6, fontSize: 14, padding: 11 }} ref={inputRef} />
          </FormItem>
        </Form>
      </ModalAntd>
    </View>
  );
};

export { ButtonCreateBar };
