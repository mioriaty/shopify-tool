import { Input } from 'antd';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Button } from 'app/components/Button';
import { ModalAntd } from 'app/components/ModalAntd';
import { useActionRemoveIdEditing } from 'app/containers/SmartBarPage/actions/actionIdEditing';
import { useIframeLoaded } from 'app/hooks/useIframeLoaded';
import { smartBarPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { CONFIG_SETTING_URL } from 'app/types/configSetting';
import { pmParent } from 'app/utils/constants/postmessage';
import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme, View } from 'wiloke-react-core';
import { useActionAddConfig } from '../actions/actionConfig';
import { useCreateNameSmartBar } from '../actions/actionStatisticPopup';

interface ButtonCreateNewProps {}

const ButtonCreateBar: FC<ButtonCreateNewProps> = () => {
  const statisticState = useSelector(smartBarPageSelectors.statisticData);
  const nameSmartBar = useSelector(smartBarPageSelectors.title);
  const idEditing = useSelector(smartBarPageSelectors.idEditing);

  const setRemoveIdEditing = useActionRemoveIdEditing();
  const setNameSmartBar = useCreateNameSmartBar();
  const setAddConfig = useActionAddConfig();

  const { colors } = useTheme();
  const [form] = useForm();
  const { loaded, setLoaded } = useIframeLoaded();
  const inputRef = useRef<Input>(null);
  const pmRef = useRef<() => void | undefined>();

  const [isCreate, setCreate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isCreate && loaded) {
      pmParent.emit('@createSmartBar', undefined);
      setCreate(false);
      setLoaded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, isCreate]);

  // Nếu không tồn tại id đang edit thì gọi action create new popup và nhận lại config ới
  useEffect(() => {
    pmRef.current = pmParent.on('@saveAndPublish', payload => {
      if (!idEditing) {
        setAddConfig.request({ config: payload.result, name: nameSmartBar });
      }
    });

    return () => {
      pmRef.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEditing, nameSmartBar]);

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
    if (!!nameSmartBar) {
      setRemoveIdEditing();
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
        loading={statisticState.createItemStatus === 'loading'}
        onClick={() => {
          setNameSmartBar('');
          setRemoveIdEditing();
          setModalVisible(true);
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
        onOk={handleCreate}
        okButtonProps={{ style: { backgroundColor: colors.gray8 } }}
        title={i18n.t('enterSmartBarName')}
        okText={i18n.t('createSmartBar')}
      >
        <Form
          form={form}
          onValuesChange={changedValues => {
            setNameSmartBar(changedValues.name);
          }}
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
