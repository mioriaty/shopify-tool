import { FC } from 'react';
import { View } from 'wiloke-react-core';
import { Box } from '../Box';
import { ChartProps, Chart } from '../Chart';
import { IconBoxProps, IconBox } from '../IconBox';
import randomColors from './randomColor';
import { StatisticBoxLoading } from './StatisticBoxLoading';

export interface StatisticBoxProps {
  iconName: IconBoxProps['iconName'];
  colorIcon?: IconBoxProps['color'];
  radiusIcon?: IconBoxProps['radius'];
  chartColor?: ChartProps['chartColor'];
  views?: number;
  title?: string;
  chartData: ChartProps['series'];
  customLabel: ChartProps['getLabel'];
}

interface StatisticBoxStatic {
  Loading: typeof StatisticBoxLoading;
}

function randomColor(arrColors: string[]) {
  return arrColors[Math.floor(Math.random() * arrColors.length)];
}

const StatisticBox: FC<StatisticBoxProps> & StatisticBoxStatic = ({
  iconName,
  colorIcon = randomColor(randomColors),
  radiusIcon = 16,
  views = '143',
  chartData,
  title = 'Views',
  chartColor,
  customLabel,
}) => {
  return (
    <Box radius={16} css={{ overflow: 'visible' }}>
      <View height={100} css={{ padding: '25px', display: 'flex', alignItems: 'center' }}>
        <View width={50} height={50} css={{ marginRight: '14px' }}>
          <IconBox iconName={iconName} color={colorIcon} radius={radiusIcon} />
        </View>
        <View css={{ marginRight: '50px' }}>
          <View color="gray5" css={{ fontWeight: 500, fontSize: '14px', lineHeight: '18px' }}>
            {title}
          </View>
          <View color="gray8" css={{ fontSize: '24px', lineHeight: '30px', fontWeight: 400 }}>
            {views}
          </View>
        </View>
        <Chart getLabel={customLabel} height={90} series={chartData} chartColor={chartColor} />
      </View>
    </Box>
  );
};

StatisticBox.Loading = StatisticBoxLoading;

export { StatisticBox };
