import { Input } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { ModalAntd } from 'app/components/ModalAntd';
import { StatisticDetail } from 'app/components/StatisticDetail';
import { useFirebaseRemove } from 'app/hooks/useFirebaseRemove';
import { useIframeLoaded } from 'app/hooks/useIframeLoaded';
import { ClientSmartBarServiceModel } from 'app/services/SmartBarService';
import { smartBarPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { pmParent } from 'app/utils/constants/postmessage';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';
import { ActivityIndicator, Text, View, ViewportTracking } from 'wiloke-react-core';
import { useActionEditConfig, useDraftConfig } from '../actions/actionConfig';
import { useActionGetIdEditing, useActionRemoveIdEditing } from '../actions/actionIdEditing';
import { useActionFetchStatisticData, useUpdateTitleSmartBar } from '../actions/actionStatisticPopup';
import { useActiveSmartBar } from '../hooks/useActiveSmartBar';
import { useClickDownload } from '../hooks/useClickDownload';
import { useClickEdit } from '../hooks/useClickEdit';
import { useDeleteSingleItem } from '../hooks/useDeleteSingleItem';
import { useEditSmartBar } from '../hooks/useEditSmartBar';
import { useSelectItem } from '../hooks/useSelectItem';
import { SmartBarTable } from './SmartBarTable';

interface StatisticDetailSmartBarProps {}

const StatisticDetailSmartBar: FC<StatisticDetailSmartBarProps> = () => {
  // selectors
  const smartBarState = useSelector(smartBarPageSelectors.statisticData);
  const selectAllState = useSelector(smartBarPageSelectors.selectedAll);
  const idEditingState = useSelector(smartBarPageSelectors.idEditing);
  const totalItem = useSelector(smartBarPageSelectors.allData);
  const activeItem = useSelector(smartBarPageSelectors.activeData);
  const pausedItem = useSelector(smartBarPageSelectors.deactiveData);
  const activeTabState = useSelector(smartBarPageSelectors.activeTab);
  const tableSmartBarState = useSelector(smartBarPageSelectors.tableData);
  const tableSmartBarData = tableSmartBarState[idEditingState]?.data
    ? tableSmartBarState[idEditingState]
    : { data: [], status: 'loading', message: '' };

  // dispatcher
  const setRemoveIdEditing = useActionRemoveIdEditing();
  const setDraftConfig = useDraftConfig();
  const setUpdateConfig = useActionEditConfig();
  const fetchData = useActionFetchStatisticData();
  const setTitleSmartBar = useUpdateTitleSmartBar();
  const setIdEditing = useActionGetIdEditing();

  // hooks
  const { loaded, setLoaded } = useIframeLoaded();
  const { handleRemove } = useFirebaseRemove();
  const { handleActive } = useActiveSmartBar();
  const { handleClickDownload } = useClickDownload();
  const { handleClickEdit } = useClickEdit();
  const { handleDeleteItem } = useDeleteSingleItem();
  const { handleEditSmartBar } = useEditSmartBar();
  const { handleSelected } = useSelectItem();

  // state
  const pmSaveAndPublish = useRef<() => void | undefined>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [editId, setEditId] = useState('');
  const [editValue, setEditValue] = useState('');
  // const [modalPricingVisible, setModalPricingVisible] = useState(false);

  // // Gửi lên config của item khi ấn vào edit
  useEffect(() => {
    if (loaded && !!idEditingState) {
      handleEditSmartBar(idEditingState);
      setLoaded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEditingState, smartBarState, loaded]);

  // Nhận lại config mới ở postmessage sau khi edit xong
  useEffect(() => {
    pmSaveAndPublish.current = pmParent.on('@saveAndPublish', payload => {
      if (!!idEditingState) {
        setUpdateConfig.request({ id: idEditingState, config: payload.result });
        handleRemove(idEditingState);
        setDraftConfig(payload.result);
        // setModalPricingVisible(true);
      }
    });

    return () => {
      pmSaveAndPublish.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEditingState]);

  const renderEditContent = (item: ClientSmartBarServiceModel) => {
    return smartBarState.editConfigStatus[item.id] === 'loading' ? (
      <View css={{ display: 'flex', alignItems: 'center' }}>
        <ActivityIndicator size="small" />
        <Text tagName="span" css={{ marginLeft: '8px' }}>
          {i18n.t('edit')}
        </Text>
      </View>
    ) : (
      i18n.t('edit')
    );
  };

  const renderDeleteContent = () => {
    return smartBarState.deleteStatus === 'loading' ? (
      <View css={{ display: 'flex', alignItems: 'center' }}>
        <ActivityIndicator size="small" />
        <Text tagName="span" css={{ marginLeft: '8px' }}>
          {i18n.t('delete')}
        </Text>
      </View>
    ) : (
      i18n.t('delete')
    );
  };

  const handleLoadMore = () => {
    fetchData.request({ endpoint: null, page: smartBarState.currentPage + 1 });
  };

  const renderLoading = () => {
    if (smartBarState.currentPage < smartBarState.maxPages || smartBarState.status === 'loading') {
      return (
        <ViewportTracking offsetTop={-50} onEnterViewport={handleLoadMore}>
          <StatisticDetail.Loading />
          <StatisticDetail.Loading />
          <StatisticDetail.Loading />
        </ViewportTracking>
      );
    }
    return null;
  };

  const renderEditTitle = (item: ClientSmartBarServiceModel) => {
    return (
      <View>
        {smartBarState.editConfigStatus[item.id] === 'loading' ? (
          <View css={{ display: 'flex', alignItems: 'center' }}>
            <ActivityIndicator size="small" />
            <Text tagName="span" css={{ marginLeft: '8px' }}>
              {i18n.t('editTitle')}
            </Text>
          </View>
        ) : (
          i18n.t('editTitle')
        )}
      </View>
    );
  };

  const renderData = (data: ClientSmartBarServiceModel[]) => {
    return (
      <View>
        {data.map(item => (
          <StatisticDetail
            // StatisticDetailProps
            key={item.id}
            item={item}
            isActiveLoading={smartBarState.updateStatusItem[item.id] === 'loading' || smartBarState.editConfigStatus[item.id] === 'loading'}
            selected={selectAllState}
            onActive={handleActive(item)}
            onSelected={() => handleSelected(item)}
            // PopoverContentProps
            onDelete={() => handleDeleteItem(item)}
            onEdit={() => handleClickEdit(item)}
            onIconClick={() => {
              setEditId(item.id);
              setEditValue(item.title);
              setRemoveIdEditing();
            }}
            editContent={renderEditContent(item)}
            deleteContent={renderDeleteContent()}
            downloadContent={i18n.t('subscribers')}
            onDownload={() => {
              setModalVisible(true);
              handleClickDownload(item);
            }}
            onEditTitle={() => {
              setIdEditing(item.id);
              setModalEditShow(true);
            }}
            editTitle={renderEditTitle(item)}
          />
        ))}
        {renderLoading()}
      </View>
    );
  };

  const mappingFilterData: Record<string, ReactNode> = {
    all: renderData(totalItem),
    active: renderData(activeItem),
    paused: renderData(pausedItem),
  };

  const handleSubmitChangeEdit = () => {
    if (editValue) {
      setTitleSmartBar.request({ id: editId, title: editValue });
      setModalEditShow(false);
    }
  };

  return (
    <View>
      {mappingFilterData[activeTabState]}

      <ModalAntd
        width={900}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        title={i18n.t('subscribers')}
        okButtonProps={{
          style: {
            opacity: tableSmartBarData.data.length > 0 ? 1 : 0.4,
            userSelect: tableSmartBarData.data.length > 0 ? 'auto' : 'none',
            cursor: tableSmartBarData.data.length > 0 ? 'pointer' : 'no-drop',
          },
        }}
        okText={
          <CSVLink
            filename="subscribers.csv"
            onClick={() => {
              setModalVisible(false);
              if (tableSmartBarData.data.length > 0) {
                return true;
              }
              return false;
            }}
            data={tableSmartBarData.data}
            style={{
              cursor: tableSmartBarData.data.length > 0 ? 'pointer' : 'no-drop',
            }}
          >
            {i18n.t('downloadSubscribers')}
          </CSVLink>
        }
        cancelText={i18n.t('cancel')}
      >
        <SmartBarTable />
      </ModalAntd>

      <ModalAntd
        width={600}
        visible={modalEditShow}
        onCancel={() => {
          setModalEditShow(false);
        }}
        onOk={handleSubmitChangeEdit}
        title={i18n.t('editTitle')}
        okText={i18n.t('save')}
        cancelText={i18n.t('cancel')}
      >
        <Form
          initialValues={{
            titleSmartBar: editValue,
          }}
          onValuesChange={changedValues => {
            setEditValue(changedValues.titleSmartBar);
          }}
          onSubmitCapture={handleSubmitChangeEdit}
        >
          <FormItem name="titleSmartBar" rules={[{ required: true, message: i18n.t('pleaseEnterPopupName') }]}>
            <Input size="large" style={{ borderRadius: 6, fontSize: 14, padding: 11 }} />
          </FormItem>
        </Form>
      </ModalAntd>

      {/* <ModalPricing show={modalPricingVisible} /> */}
    </View>
  );
};

export { StatisticDetailSmartBar };
