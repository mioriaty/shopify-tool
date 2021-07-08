import { ModalAntd } from 'app/components/ModalAntd';
import { StatisticDetail } from 'app/components/StatisticDetail';
import { useIframeLoaded } from 'app/hooks/useIframeLoaded';
import useInfo from 'app/hooks/useInfo';
// import { useIframeLoaded } from 'app/hooks/useIframeLoaded';
import { ClientSmartBarServiceModel } from 'app/services/SmartBarService';
import { smartBarPageSelectors } from 'app/store/general/selectors';
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
import { useFetchTableSmartBar } from '../actions/actionTable';
import { SmartBarTable } from './SmartBarTable';

interface StatisticDetailSmartBarProps {}

const StatisticDetailSmartBar: FC<StatisticDetailSmartBarProps> = () => {
  // selectors
  const smartBarState = useSelector(smartBarPageSelectors.statisticData);
  const selectedStatisticItemState = useSelector(smartBarPageSelectors.selectedIds);
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
  const { accessToken, userPackage, discounts } = useInfo();

  // dispatcher
  const setSelectedIds = useActionSelectItem();
  const setIdEditing = useActionGetIdEditing();
  const setRemoveIdEditing = useActionRemoveIdEditing();
  const getPopupItem = useActionGetPopupItem();
  const setDeleteItems = useActionDeleteItems();
  const setUpdateStatusItem = useActionUpdateStatusItem();
  const setUpdateConfig = useActionEditConfig();
  const tableData = useFetchTableSmartBar();
  const fetchData = useActionFetchStatisticData();

  // state
  const pmSaveAndPublish = useRef<() => void | undefined>();
  const [modalVisible, setModalVisible] = useState(false);
  const { loaded, setLoaded } = useIframeLoaded();

  const handleEditSmartBar = (idEditing: string) => {
    const config = smartBarState.data.find(item => item.id === idEditing)?.config;
    pmParent.emit('@editSmartBar', {
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
      }
    });

    return () => {
      pmSaveAndPublish.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idEditingState]);

  const handleActive = (item: ClientSmartBarServiceModel) => (isActive: boolean) => {
    const status = isActive === true ? 'active' : 'deactive';
    setUpdateStatusItem.request({ id: item.id, status });
  };

  // Xử lý delete khi bấm vào nút delete trong popover
  const handleDeleteItem = (item: ClientSmartBarServiceModel) => () => {
    setDeleteItems.request({ ids: [item.id] });
  };

  const handleSelected = (item: ClientSmartBarServiceModel) => () => {
    let selectedArr: string[] = [];
    if (!selectedStatisticItemState.includes(item.id)) {
      selectedArr = [...selectedStatisticItemState, item.id];
    } else {
      selectedArr = selectedStatisticItemState.filter(x => x !== item.id);
    }
    setSelectedIds(selectedArr);
  };

  const handleClickEdit = (item: ClientSmartBarServiceModel) => () => {
    // setIsEditing(true);
    getPopupItem.request({
      id: item.id,
      callback: () => {
        pmParent.setPopup(CONFIG_SETTING_URL);
        handleEditSmartBar(item.id);
        setIdEditing(item.id);
      },
    });
  };

  const handleClickDownload = (item: ClientSmartBarServiceModel) => () => {
    setModalVisible(true);
    setIdEditing(item.id);
    tableData.request({ id: item.id });
  };

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

  const renderData = (data: ClientSmartBarServiceModel[]) => {
    return (
      <View>
        {data.map(item => (
          <StatisticDetail
            // StatisticDetailProps
            key={item.id}
            item={item}
            isActiveLoading={smartBarState.updateStatusItem[item.id] === 'loading'}
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
              if (tableSmartBarData.data.length > 0) {
                return true;
              }
              return false;
            }}
            data={tableSmartBarData.data}
          >
            {i18n.t('downloadSubscribers')}
          </CSVLink>
        }
        cancelText={i18n.t('cancel')}
      >
        <SmartBarTable />
      </ModalAntd>
    </View>
  );
};

export { StatisticDetailSmartBar };
