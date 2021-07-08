import { Card } from 'app/components/Card';
import { dashboardPageSelectors } from 'app/store/general/selectors';
import { isEmpty } from 'ramda';
import { FC, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'wiloke-react-core';
import { useFetchSmartBar, useFetchStatisticList } from '../actions/actionStatisticList';
import { SectionPopup } from './SectionPopup';
import { SectionSmartBar } from './SectionSmartBar';

export type Pages = 'popups' | 'products' | 'smartBar';

export interface SectionDataProps {}

const SectionData: FC<SectionDataProps> = () => {
  // selectors
  const statisticState = useSelector(dashboardPageSelectors.statisticData);
  const filterByPage = useSelector(dashboardPageSelectors.filterByPage);

  // dispatcher
  const fetchStatisticData = useFetchStatisticList();
  const fetchSmartBar = useFetchSmartBar();

  useEffect(() => {
    if (isEmpty(statisticState.popups.data)) {
      fetchStatisticData.request({
        params: {
          filter: 'today',
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEmpty(statisticState.smartBar.data)) {
      fetchSmartBar.request({
        params: {
          filter: 'today',
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mappingRenderByPage: Record<string, ReactNode> = {
    all: (
      <View>
        <SectionPopup />
        <SectionSmartBar />
      </View>
    ),
    popup: <SectionPopup />,
    smartBar: <SectionSmartBar />,
  };

  return (
    <View>
      {mappingRenderByPage[filterByPage]}

      <View row>
        {statisticState.popups.data.length === 0 && statisticState.popups.status !== 'loading' && (
          <View columns={[12, 4, 4]}>
            <Card
              title="Popup"
              description="Pellentesque blandit diam ac porttitor sodales. Sed dapibus urna purus vitae efficitur ante vulputate non."
              link="popup"
              textButton="Create Popup"
              imageSrc="https://polaris.shopify.com/bundles/bc7087219578918d62ac40bf4b4f99ce.png"
            />
          </View>
        )}
        {statisticState.smartBar.data.length === 0 && statisticState.smartBar.status !== 'loading' && (
          <View columns={[12, 4, 4]}>
            <Card
              title="Smart Bar"
              description="Pellentesque blandit diam ac porttitor sodales. Sed dapibus urna purus vitae efficitur ante vulputate non."
              link="smart-banner"
              textButton="Create Smart Bar"
              imageSrc="https://polaris.shopify.com/bundles/bc7087219578918d62ac40bf4b4f99ce.png"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export { SectionData };
