import { ModalAntd } from 'app/components/ModalAntd';
import { StatisticDetail } from 'app/components/StatisticDetail';
import { useIframeLoaded } from 'app/hooks/useIframeLoaded';
import useInfo from 'app/hooks/useInfo';
import { ClientStatisticDetailModel } from 'app/services/PopupService';
import { popupPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { CONFIG_SETTING_URL } from 'app/types/configSetting';
import { pmParent } from 'app/utils/constants/postmessage';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';
import { ActivityIndicator, Text, View, ViewportTracking } from 'wiloke-react-core';
import { useActionEditConfig } from '../actions/actionConfig';
import { useActionGetIdEditing, useActionRemoveIdEditing } from '../actions/actionIdEditing';
import { useActionSelectItem } from '../actions/actionSelectItem';
import { useActionDeleteItems, useActionFetchStatisticData, useActionGetPopupItem, useActionUpdateStatusItem } from '../actions/actionStatisticPopup';
import { useFetchTablePopup } from '../actions/actionTable';
import { PopupTable } from './PopupTable';

interface StatisticDetailPopupProps {}

const StatisticDetailPopup: FC<StatisticDetailPopupProps> = () => {
  // selectors
  const statisticDetailState = useSelector(popupPageSelectors.statisticData);
  const selectedStatisticItemState = useSelector(popupPageSelectors.selectedIds);
  const selectAllState = useSelector(popupPageSelectors.selectedAll);
  const idEditingState = useSelector(popupPageSelectors.idEditing);
  const totalItem = useSelector(popupPageSelectors.allData);
  const activeItem = useSelector(popupPageSelectors.activeData);
  const pausedItem = useSelector(popupPageSelectors.deactiveData);
  const activeTabState = useSelector(popupPageSelectors.activeTab);
  const tablePopupState = useSelector(popupPageSelectors.tableData);
  const tablePopupData = tablePopupState[idEditingState]?.data ? tablePopupState[idEditingState] : { data: [], status: 'loading', message: '' };
  const { accessToken, userPackage, discounts } = useInfo();

  // dispatcher
  const setSelectedIds = useActionSelectItem();
  const setRemoveIdEditing = useActionRemoveIdEditing();
  const getIdItem = useActionGetIdEditing();
  const getPopupItem = useActionGetPopupItem();
  const setDeleteItems = useActionDeleteItems();
  const setUpdateStatusItem = useActionUpdateStatusItem();
  const setUpdateConfig = useActionEditConfig();
  const tableData = useFetchTablePopup();
  const fetchStatisticData = useActionFetchStatisticData();
  const { loaded, setLoaded } = useIframeLoaded();

  // state
  const pmSaveAndPublish = useRef<() => void | undefined>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleEditPopup = (idEditing: string) => {
    const config = statisticDetailState.data.find(item => item.id === idEditing)?.config;
    pmParent.emit('@editPopup', {
      config,
    });
    if (discounts && userPackage && accessToken) {
      pmParent.emit('@sendInfo', {
        campaignId: idEditing,
        accessToken,
        discounts,
        userPackage,
      });
    }
  };

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
        setUpdateConfig.request({ id: idEditingState, config: payload.result });
      }
    });

    return () => {
      pmSaveAndPublish.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEditingState]);

  const handleActive = (item: ClientStatisticDetailModel) => (isActive: boolean) => {
    const status = isActive === true ? 'active' : 'deactive';
    setUpdateStatusItem.request({ id: item.id, status });
  };

  // Xử lý delete khi bấm vào nút delete trong popover
  const handleDeleteItem = (item: ClientStatisticDetailModel) => () => {
    setDeleteItems.request({ ids: [item.id] });
  };

  const handleSelected = (item: ClientStatisticDetailModel) => () => {
    let selectedArr: string[] = [];
    if (!selectedStatisticItemState.includes(item.id)) {
      selectedArr = [...selectedStatisticItemState, item.id];
    } else {
      selectedArr = selectedStatisticItemState.filter(x => x !== item.id);
    }
    setSelectedIds(selectedArr);
  };

  const handleClickEdit = (item: ClientStatisticDetailModel) => () => {
    getPopupItem.request({
      id: item.id,
      callback: () => {
        pmParent.setPopup(CONFIG_SETTING_URL);
        handleEditPopup(item.id);
        getIdItem(item.id);
      },
    });
  };

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

  const handleClickDownload = (item: ClientStatisticDetailModel) => () => {
    setModalVisible(true);
    getIdItem(item.id);
    tableData.request({ id: item.id });
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
            isActiveLoading={statisticDetailState.updateStatusItem[item.id] === 'loading'}
            selected={selectAllState}
            onActive={handleActive(item)}
            onSelected={handleSelected(item)}
            // PopoverContentProps
            onDelete={handleDeleteItem(item)}
            onEdit={handleClickEdit(item)}
            onIconClick={() => {
              setRemoveIdEditing();
            }}
            editContent={renderEditContent(item)}
            deleteContent={renderDeleteContent()}
            downloadContent={i18n.t('subscribers')}
            onDownload={handleClickDownload(item)}
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
            data={tablePopupData.data}
          >
            {i18n.t('downloadSubscribers')}
          </CSVLink>
        }
        cancelText={i18n.t('cancel')}
      >
        <PopupTable />
      </ModalAntd>
    </View>
  );
};

export { StatisticDetailPopup };
