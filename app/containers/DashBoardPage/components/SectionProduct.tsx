import { AsyncComponent } from 'app/components/AsyncComponent';
import { SectionTitle } from 'app/components/SectionTitle';
import { StatisticBox } from 'app/components/StatisticBox';
import { dashboardPageSelectors } from 'app/store/general/selectors';
import { useSelector } from 'react-redux';
import { LineAwesomeName, View } from 'wiloke-react-core';
import { transformTimestampToDate } from '../utils/transformTimestampToDate';

const SectionProduct = () => {
  const statisticState = useSelector(dashboardPageSelectors.statisticData);
  const spaceBot = statisticState.products.data.length === 0 && statisticState.products.status !== 'loading' ? '0px' : '30px';

  const renderIcon = (type: string): LineAwesomeName => {
    switch (type) {
      case 'sale': {
        return 'shopping-cart';
      }
      case 'view': {
        return 'line-chart';
      }
      case 'review': {
        return 'star-o';
      }
      default: {
        return 'heart-o';
      }
    }
  };

  const renderColorIcon = (type: string) => {
    switch (type) {
      case 'sale': {
        return '#5DE1BB';
      }
      case 'view': {
        return '#FAC069';
      }
      case 'review': {
        return 'star-o';
      }
      default: {
        return '#FAC069';
      }
    }
  };

  return (
    <View row css={{ marginBottom: spaceBot }}>
      {statisticState.products.data.length > 0 && (
        <View columns={[12, 10, 10]} css={{ marginBottom: '10px' }}>
          <SectionTitle title="Product Badge" />
          <View color="gray6">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</View>
        </View>
      )}
      <AsyncComponent
        status={statisticState.products.status}
        Failure={<View />}
        Request={[0, 1, 2].map(item => (
          <View className="dashboard__items" key={item} columns={[12, 4, 4]}>
            <View css={{ width: '100%' }}>
              <StatisticBox.Loading />
            </View>
          </View>
        ))}
        Success={statisticState.products.data.map((item, index) => {
          return (
            <View className="dashboard__items" key={index} columns={[12, 4, 4]}>
              <View css={{ width: '100%' }}>
                <StatisticBox
                  customLabel={(_, opts) => {
                    const convertFrom = !!item.from && Array.isArray(item.from) ? transformTimestampToDate(item.from) : [];
                    const convertTo = !!item.to && Array.isArray(item.to) ? transformTimestampToDate(item.to) : [];

                    const mergeByIndex = convertFrom.map((num, index) => {
                      let result = '';

                      if (convertTo[index] === undefined || typeof convertTo[index] !== 'string' || !convertTo[index]) {
                        result = `${num}`;
                      } else {
                        result = `${num} - ${convertTo[index]}`;
                      }
                      return result;
                    });

                    return mergeByIndex[opts.dataPointIndex];
                  }}
                  iconName={renderIcon(item.type)}
                  colorIcon={renderColorIcon(item.type)}
                  chartColor={renderColorIcon(item.type)}
                  chartData={item.timeline as any}
                  title={item.title}
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

export { SectionProduct };
