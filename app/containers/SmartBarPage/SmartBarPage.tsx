import { smartBarPageSelectors } from 'app/store/general/selectors';
import { isEmpty } from 'ramda';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'wiloke-react-core';
import { EmptyPage } from '../EmptyPage';
import { useActionFetchStatisticData } from './actions/actionStatisticPopup';
import { ButtonCreateBar } from './components/ButtonCreateBar';
import { DeleteCampaign as DeleteCampaignButton } from './components/DeleteCampaignButton';
import { FilterTab } from './components/FilterTab';
import { PageHeader } from './components/PageHeader';
import { StatisticDetailSmartBar } from './components/StatisticDetailSmartBar';
import { TableHeader as PageDataTable } from './components/TableHeader';
import * as styles from './styles';

const SmartBarPage = () => {
  // selectors
  const statisticDetailState = useSelector(smartBarPageSelectors.statisticData);
  const selectedStatisticItemState = useSelector(smartBarPageSelectors.selectedIds);
  const totalItem = useSelector(smartBarPageSelectors.allData);

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
    return <EmptyPage title="Smart Bar" ButtonCreate={<ButtonCreateBar />} />;
  }

  return (
    <View className="smartbar-container" css={styles.container}>
      <PageHeader />

      <View row css={{ marginBottom: '20px', alignItems: 'center' }}>
        <FilterTab />
        {selectedStatisticItemState.length > 0 && <DeleteCampaignButton />}
      </View>

      <View className="smartbar__table-container">
        <View className="smartbar__table">
          <PageDataTable />
          <StatisticDetailSmartBar />
        </View>
      </View>
    </View>
  );
};

export { SmartBarPage };
