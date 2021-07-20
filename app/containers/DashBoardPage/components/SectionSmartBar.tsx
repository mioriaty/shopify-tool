import { AsyncComponent } from 'app/components/AsyncComponent';
import { SectionTitle } from 'app/components/SectionTitle';
import { StatisticBox } from 'app/components/StatisticBox';
import { dashboardPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { useSelector } from 'react-redux';
import { LineAwesomeName, View } from 'wiloke-react-core';
import { transformTimestampToDate } from '../utils/transformTimestampToDate';

const SectionSmartBar = () => {
  const statisticState = useSelector(dashboardPageSelectors.statisticData);
  const spaceBot = statisticState.smartBar.data.length === 0 && statisticState.smartBar.status !== 'loading' ? '0px' : '30px';

  const renderIcon = (type: string): LineAwesomeName => {
    switch (type) {
      case 'click': {
        return 'mouse-pointer';
      }
      case 'view': {
        return 'line-chart';
      }
      case 'subscriber': {
        return 'heart-o';
      }
      default: {
        return 'heart-o';
      }
    }
  };

  const renderColorIcon = (type: string) => {
    switch (type) {
      case 'view': {
        return '#FAC069';
      }
      case 'click': {
        return '#8CACFF';
      }
      case 'subscriber': {
        return '#FA8989';
      }
      default: {
        return '#FAC069';
      }
    }
  };

  return (
    <View row css={{ marginBottom: spaceBot }}>
      {statisticState.smartBar.data.length > 0 && (
        <View columns={[12, 10, 10]} css={{ marginBottom: '10px' }}>
          <SectionTitle title={i18n.t('smartBar')} />
          <View color="gray6">{i18n.t('smartBarSectionDescription')}</View>
        </View>
      )}
      <AsyncComponent
        status={statisticState.smartBar.status}
        Failure={<View />}
        Request={[0, 1, 2].map(item => (
          <View className="dashboard__items" key={item} columns={[12, 4, 4]}>
            <View css={{ width: '100%' }}>
              <StatisticBox.Loading />
            </View>
          </View>
        ))}
        Success={statisticState.smartBar.data.map((item, index) => (
          <View className="dashboard__items" key={index} columns={[12, 4, 4]}>
            <View css={{ width: '100%' }}>
              <StatisticBox
                customLabel={(_, opts) => {
                  const convertFrom = !!item.from && Array.isArray(item.from) ? transformTimestampToDate(item.from) : [];
                  const convertTo = !!item.to && Array.isArray(item.to) ? transformTimestampToDate(item.to) : [];

                  const mergeByIndex = convertFrom.map((num, index) => {
                    let result = '';
                    if (convertTo[index] === undefined) {
                      result = `${num}`;
                    } else {
                      result = `${num} - ${convertTo[index]}`;
                    }
                    return result;
                  });

                  return mergeByIndex[opts.dataPointIndex];
                }}
                iconName={renderIcon(item?.type)}
                colorIcon={renderColorIcon(item?.type)}
                chartColor={renderColorIcon(item?.type)}
                chartData={item?.timeline as any}
                title={item.title}
                views={item.summary}
              />
            </View>
          </View>
        ))}
      />
    </View>
  );
};

export { SectionSmartBar };
