import { dashboardPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Text, View } from 'wiloke-react-core';
import { DateFilter } from './components/DateFilter';
import { PageFilter } from './components/PageFilter';
import { SectionData } from './components/SectionData';
import * as styles from './styles';

const DashBoardPage: FC = () => {
  const statisticDashboardState = useSelector(dashboardPageSelectors.statisticData);

  return (
    <View css={styles.dashboardContainer}>
      <View row css={{ alignItems: 'center' }}>
        <View columns={[12, 6, 6]}>
          <Text color="gray9" size={28} css={{ fontWeight: 600, lineHeight: '42px' }}>
            {i18n.t('statistics')}
          </Text>
          <Text color="gray6" size={14} css={{ fontWeight: 400, lineHeight: '20px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </View>
        <View className="dashboard__filter-container" columns={[12, 6, 6]} css={{ paddingRight: 0 }}>
          {statisticDashboardState.popups.data.length > 0 ||
          statisticDashboardState.products.data.length > 0 ||
          statisticDashboardState.smartBar.data.length > 0 ? (
            <View css={{ width: '100%', justifyContent: 'flex-end' }} row>
              <PageFilter />
              <DateFilter />
            </View>
          ) : null}
        </View>
      </View>

      <View height={1} backgroundColor="gray3" css={{ width: '100%', margin: '20px 0' }} />

      <SectionData />
    </View>
  );
};

export { DashBoardPage };
