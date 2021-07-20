import { Input } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { ModalAntd } from 'app/components/ModalAntd';
import { StatisticDetail } from 'app/components/StatisticDetail';
import { useFirebaseRemove } from 'app/hooks/useFirebaseRemove';
import { useIframeLoaded } from 'app/hooks/useIframeLoaded';
import { ClientStatisticDetailModel } from 'app/services/PopupService';
import { popupPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { pmParent } from 'app/utils/constants/postmessage';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';
import { ActivityIndicator, Text, View, ViewportTracking } from 'wiloke-react-core';
import { useActionEditConfig, useDraftConfig } from '../actions/actionConfig';
import { useActionGetIdEditing, useActionRemoveIdEditing } from '../actions/actionIdEditing';
import { useActionFetchStatisticData, useUpdateTitlePopup } from '../actions/actionStatisticPopup';
import { useActivePopup } from '../hooks/useActivePopup';
import { useClickDownload } from '../hooks/useClickDownload';
import { useClickEdit } from '../hooks/useClickEdit';
import { useDeleteSingleItem } from '../hooks/useDeleteSingleItem';
import { useEditPopup } from '../hooks/useEditPopup';
import { useSelectItem } from '../hooks/useSelectItem';
// import { ModalPricing } from './ModalPricing';
import { PopupTable } from './PopupTable';

interface StatisticDetailPopupProps {}

const StatisticDetailPopup: FC<StatisticDetailPopupProps> = () => {
  // selectors
  const statisticDetailState = useSelector(popupPageSelectors.statisticData);
  const selectAllState = useSelector(popupPageSelectors.selectedAll);
  const idEditingState = useSelector(popupPageSelectors.idEditing);
  const totalItem = useSelector(popupPageSelectors.allData);
  const activeItem = useSelector(popupPageSelectors.activeData);
  const pausedItem = useSelector(popupPageSelectors.deactiveData);
  const activeTabState = useSelector(popupPageSelectors.activeTab);
  const tablePopupState = useSelector(popupPageSelectors.tableData);
  const tablePopupData = tablePopupState[idEditingState]?.data ? tablePopupState[idEditingState] : { data: [], status: 'loading', message: '' };

  // dispatcher
  const removeIdEditing = useActionRemoveIdEditing();
  const setIdEditing = useActionGetIdEditing();
  const setDraftConfig = useDraftConfig();
  const fetchStatisticData = useActionFetchStatisticData();
  const setUpdateConfig = useActionEditConfig();
  const setTitlePopup = useUpdateTitlePopup();

  // hooks
  const { loaded, setLoaded } = useIframeLoaded();
  const { handleClickEdit } = useClickEdit();
  const { handleEditPopup } = useEditPopup();
  const { handleSelected } = useSelectItem();
  const { handleDeleteItem } = useDeleteSingleItem();
  const { handleActive } = useActivePopup();
  const { handleClickDownload } = useClickDownload();
  const { handleRemove } = useFirebaseRemove();

  // state
  const pmSaveAndPublish = useRef<(() => void) | undefined>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [editId, setEditId] = useState('');
  const [editValue, setEditValue] = useState('');
  // const [pricingModalVisible, setPricingModalVisible] = useState(false);

  // Gửi lên config của item khi ấn vào edit
  useEffect(() => {
    if (loaded && !!idEditingState) {
      handleEditPopup(idEditingState);
      setLoaded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEditingState, statisticDetailState, loaded]);

  // Nhận lại config mới ở postmessage sau khi edit xong
  useEffect(() => {
    pmSaveAndPublish.current = pmParent.on('@saveAndPublish', payload => {
      if (!!idEditingState) {
        console.log('on after edit: ', idEditingState);
        setUpdateConfig.request({ id: idEditingState, config: payload.result });
        setDraftConfig(payload.result);
        handleRemove(idEditingState);
        // setPricingModalVisible(true);
      }
    });

    return () => {
      pmSaveAndPublish.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEditingState]);

  const renderEditContent = (item: ClientStatisticDetailModel) => {
    return statisticDetailState.editConfigStatus[item.id] === 'loading' ? (
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

  const renderEditTitle = (item: ClientStatisticDetailModel) => {
    return (
      <View>
        {statisticDetailState.editConfigStatus[item.id] === 'loading' ? (
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

  const renderDeleteContent = () => {
    return statisticDetailState.deleteStatus === 'loading' ? (
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
    fetchStatisticData.request({ endpoint: null, page: statisticDetailState.currentPage + 1 });
  };

  const renderLoading = () => {
    if (statisticDetailState.currentPage < statisticDetailState.maxPages || statisticDetailState.status === 'loading') {
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

  const renderData = (data: ClientStatisticDetailModel[]) => {
    return (
      <View>
        {data.map(item => (
          <StatisticDetail
            // StatisticDetailProps
            key={item.id}
            item={item}
            isActiveLoading={
              statisticDetailState.updateStatusItem[item.id] === 'loading' || statisticDetailState.editConfigStatus[item.id] === 'loading'
            }
            selected={selectAllState}
            onActive={handleActive(item)}
            onSelected={() => handleSelected(item)}
            // PopoverContentProps
            onDelete={() => handleDeleteItem(item)}
            onEdit={() => {
              console.log('on click edit: ', item.id);

              handleClickEdit(item);
              // removeIdEditing();
            }}
            onIconClick={() => {
              setEditId(item.id);
              setEditValue(item.title);
              removeIdEditing();
            }}
            onEditTitle={() => {
              setIdEditing(item.id);
              setModalEditShow(true);
            }}
            onDownload={() => {
              setModalVisible(true);
              handleClickDownload(item);
            }}
            editContent={renderEditContent(item)}
            editTitle={renderEditTitle(item)}
            downloadContent={i18n.t('subscribers')}
            deleteContent={renderDeleteContent()}
          />
        ))}
        {renderLoading()}
      </View>
    );
  };

  // Filter data theo status
  const mappingFilterData: Record<string, ReactNode> = {
    all: renderData(totalItem),
    active: renderData(activeItem),
    paused: renderData(pausedItem),
  };

  // handle submit change title item
  const handleSubmitChangeEdit = () => {
    if (editValue) {
      setTitlePopup.request({ id: editId, title: editValue });
      setModalEditShow(false);
    }
  };

  return (
    <View>
      {mappingFilterData[activeTabState]}

      {/* modal subsciber */}
      <ModalAntd
        width={900}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        title={i18n.t('subscribers')}
        okButtonProps={{
          style: {
            opacity: tablePopupData.data.length > 0 ? 1 : 0.4,
            userSelect: tablePopupData.data.length > 0 ? 'auto' : 'none',
            cursor: tablePopupData.data.length > 0 ? 'pointer' : 'no-drop',
          },
        }}
        okText={
          <CSVLink
            filename="subscribers.csv"
            onClick={() => {
              setModalVisible(false);
              if (tablePopupData.data.length > 0) {
                return true;
              }
              return false;
            }}
            style={{
              cursor: tablePopupData.data.length > 0 ? 'pointer' : 'no-drop',
            }}
            data={tablePopupData.data}
          >
            {i18n.t('downloadSubscribers')}
          </CSVLink>
        }
        cancelText={i18n.t('cancel')}
      >
        <PopupTable />
      </ModalAntd>

      {/* modal edit name item */}
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
            titlePopup: editValue,
          }}
          onValuesChange={changedValues => {
            setEditValue(changedValues.titlePopup);
          }}
          onSubmitCapture={handleSubmitChangeEdit}
        >
          <FormItem name="titlePopup" rules={[{ required: true, message: i18n.t('pleaseEnterPopupName') }]}>
            <Input size="large" style={{ borderRadius: 6, fontSize: 14, padding: 11 }} />
          </FormItem>
        </Form>
      </ModalAntd>

      {/* modal pricing */}
      {/* <ModalPricing show={pricingModalVisible} /> */}
    </View>
  );
};

export { StatisticDetailPopup };
