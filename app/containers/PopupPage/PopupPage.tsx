import { popupPageSelectors } from 'app/store/general/selectors';
import { isEmpty } from 'ramda';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'wiloke-react-core';
import { EmptyPage } from '../EmptyPage';
import { useActionFetchStatisticData } from './actions/actionStatisticPopup';
import { ButtonCreatePopup } from './components/ButtonCreatePopup';
import { DeleteCampaign as DeleteCampaignButton } from './components/DeleteCampaignButton';
import { FilterTab } from './components/FilterTab';
import { PageHeader } from './components/PageHeader';
import { StatisticDetailPopup } from './components/StatisticDetailPopup';
import { TableHeader } from './components/TableHeader';
import * as styles from './styles';

const PopupPage = () => {
  // selectors
  const statisticDetailState = useSelector(popupPageSelectors.statisticData);
  const selectedStatisticItemState = useSelector(popupPageSelectors.selectedIds);
  const totalItem = useSelector(popupPageSelectors.allData);

  // dispatch actions
  const fetchStatisticData = useActionFetchStatisticData();

  // Fetch all popup items
  useEffect(() => {
    if (isEmpty(statisticDetailState.data)) {
      fetchStatisticData.request({ endpoint: null, page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (totalItem.length === 0 && statisticDetailState.status !== 'loading') {
    return <EmptyPage ButtonCreate={<ButtonCreatePopup />} />;
  }

  return (
    <View className="popup-container" css={styles.container}>
      <PageHeader />

      <View row css={{ marginBottom: '20px', alignItems: 'center' }}>
        <FilterTab />
        {selectedStatisticItemState.length > 0 && <DeleteCampaignButton />}
      </View>
      <View className="popup__table-container">
        <View className="popup__table">
          <TableHeader />
          <StatisticDetailPopup />
        </View>
      </View>
    </View>
  );
};

export { PopupPage };
