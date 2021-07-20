import { AsyncComponent } from 'app/components/AsyncComponent';
import { SectionTitle } from 'app/components/SectionTitle';
import { StatisticBox } from 'app/components/StatisticBox';
import { dashboardPageSelectors } from 'app/store/general/selectors';
import { i18n } from 'app/translation';
import { useSelector } from 'react-redux';
import { LineAwesomeName, View } from 'wiloke-react-core';
import { transformTimestampToDate } from '../utils/transformTimestampToDate';

const SectionPopup = () => {
  const statisticState = useSelector(dashboardPageSelectors.statisticData);
  const spaceBot = statisticState.popups.data.length === 0 && statisticState.popups.status !== 'loading' ? '0px' : '30px';

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
      {statisticState.popups.data.length > 0 && (
        <View columns={[12, 10, 10]} css={{ marginBottom: '10px' }}>
          <SectionTitle title={i18n.t('popup')} />
          <View color="gray6">{i18n.t('popupSectionDescription')}</View>
        </View>
      )}

      <AsyncComponent
        Failure={<View />}
        status={statisticState.popups.status}
        Request={[0, 1, 2].map(item => (
          <View className="dashboard__items" key={item} columns={[12, 4, 4]}>
            <View css={{ width: '100%' }}>
              <StatisticBox.Loading />
            </View>
          </View>
        ))}
        Success={statisticState.popups.data.map((item, idx) => {
          return (
            <View className="dashboard__items" key={idx} columns={[12, 4, 4]}>
              <View css={{ width: '100%' }}>
                <StatisticBox
                  customLabel={(_, opts) => {
                    // Nối chuỗi from - to theo index
                    /* Ví dụ:
                    from: ['2021.1.2', '2021.1.10','2021.1.18']
                    to: ['2021.1.9', '2021.1.17','2021.1.25']
                    kết quả: ['2021.1.2 - 2021.1.9', '2021.1.10 - 2021.1.17','2021.1.18 - 2021.1.25']
                  */
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
                  title={item?.title}
                  views={item.summary}
                />
              </View>
            </View>
          );
        })}
      />
    </View>
  );
};

export { SectionPopup };
