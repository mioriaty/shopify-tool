import { Input } from 'antd';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Button } from 'app/components/Button';
import { ModalAntd } from 'app/components/ModalAntd';
import { useActionRemoveIdEditing } from 'app/containers/PopupPage/actions/actionIdEditing';
import { useIframeLoaded } from 'app/hooks/useIframeLoaded';
import { popupPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { CONFIG_SETTING_URL } from 'app/types/configSetting';
import { pmParent } from 'app/utils/constants/postmessage';
import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme, View } from 'wiloke-react-core';
import { useActionAddConfig } from '../actions/actionConfig';
import { useCreateNamePopup } from '../actions/actionStatisticPopup';

interface ButtonCreateNewProps {}

const ButtonCreatePopup: FC<ButtonCreateNewProps> = () => {
  const statisticState = useSelector(popupPageSelectors.statisticData);
  const namePopup = useSelector(popupPageSelectors.title);
  const idEditingState = useSelector(popupPageSelectors.idEditing);

  const setRemoveIdEditing = useActionRemoveIdEditing();
  const setAddConfig = useActionAddConfig();
  const setNamePopup = useCreateNamePopup();

  const [modalVisible, setModalVisible] = useState(false);
  const [form] = useForm();
  const [isCreate, setCreate] = useState(false);
  const inputRef = useRef<Input>(null);
  const { colors } = useTheme();
  const { loaded, setLoaded } = useIframeLoaded();
  const pmRef = useRef<() => void | undefined>();

  useEffect(() => {
    if (isCreate && loaded) {
      pmParent.emit('@createPopup', undefined);
      setCreate(false);
      setLoaded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, isCreate]);

  useEffect(() => {
    pmRef.current = pmParent.on('@saveAndPublish', payload => {
      // Nếu không tồn tại id đang edit thì gọi action create new popup
      if (!idEditingState) {
        setAddConfig.request({ config: payload.result, name: namePopup });
      }
    });

    return () => {
      pmRef.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEditingState, namePopup]);

  // auto focus input when modal visible
  useEffect(() => {
    if (!!modalVisible) {
      inputRef.current?.focus();
    } else {
      form.resetFields(['name']);
    }
  }, [form, modalVisible]);

  const handleCreate = () => {
    form.submit();
    if (!!namePopup) {
      setRemoveIdEditing();
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
    setRemoveIdEditing();
    setCreate(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setNamePopup('');
    form.resetFields(['name']);
  };

  return (
    <View>
      <Button size="large" radius={10} loading={statisticState.createItemStatus === 'loading'} onClick={handleClick}>
        {i18n.t('createNewPopup')}
      </Button>

      <ModalAntd
        visible={modalVisible}
        onCancel={handleCancel}
        onOk={handleCreate}
        okButtonProps={{ style: { backgroundColor: colors.gray8 } }}
        title={i18n.t('enterPopupName')}
        okText={i18n.t('createNewPopup')}
      >
        <Form
          form={form}
          onValuesChange={changedValues => {
            setNamePopup(changedValues.name);
          }}
          onSubmitCapture={handleCreate}
        >
          <FormItem name="name" rules={[{ required: true, message: i18n.t('pleaseEnterPopupName') }]}>
            <Input size="large" style={{ borderRadius: 6, fontSize: 14, padding: 11 }} ref={inputRef} />
          </FormItem>
        </Form>
      </ModalAntd>
    </View>
  );
};

export { ButtonCreatePopup };
