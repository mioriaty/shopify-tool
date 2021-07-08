import { Tabs } from 'app/components/Tabs';
import { smartBarPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'wiloke-react-core';
import { useActionGetTabKey } from '../actions/actionTab';
import * as styles from '../styles';

export interface FilterTabProps {}

const FilterTab: FC<FilterTabProps> = () => {
  const totalItem = useSelector(smartBarPageSelectors.allData);
  const activeItem = useSelector(smartBarPageSelectors.activeData);
  const pausedItem = useSelector(smartBarPageSelectors.deactiveData);
  const activeTabState = useSelector(smartBarPageSelectors.activeTab);
  const setActiveTab = useActionGetTabKey();

  const handleChangeTab = (activeKey: string) => {
    setActiveTab(activeKey);
  };

  return (
    <View css={styles.tabContainer} columns={[12, 9, 9]}>
      <Tabs tabTitleGutter={0} defaultActiveKey={activeTabState} activeKey={activeTabState} onChange={handleChangeTab}>
        <Tabs.Pane
          tab={
            <View>
              {i18n.t('all')}({totalItem.length})
            </View>
          }
          key="all"
        />
        <Tabs.Pane
          tab={
            <View>
              {i18n.t('active')}({activeItem.length})
            </View>
          }
          key="active"
        />
        <Tabs.Pane
          tab={
            <View>
              {i18n.t('paused')}({pausedItem.length})
            </View>
          }
          key="paused"
        />
      </Tabs>
    </View>
  );
};

export { FilterTab };
