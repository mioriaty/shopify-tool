/* eslint-disable @typescript-eslint/space-before-function-paren */
import { ApexOptions } from 'apexcharts';
// ReactApexChart not support ssr => fix tạm
import dynamic from 'next/dynamic';
import { isBrowser } from 'app/utils/isBrowser';
import { FC, useState } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type PickViewProps = Pick<ViewProps, 'width' | 'css' | 'className' | 'height'>;

export interface ChartProps extends PickViewProps {
  options?: ApexOptions;
  series: ApexOptions['series'];
  chartColor?: string;
  getLabel: (val: number, opts?: any) => string;
}

const Chart: FC<ChartProps> = ({
  chartColor = '#2AB885',
  getLabel,
  options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      events: {
        mouseMove: function (event, chartContext, config) {
          const tooltip = chartContext.el.querySelector('.apexcharts-tooltip');
          const pointsArray = config.globals.pointsArray;
          const seriesIndex = config.seriesIndex;
          const dataPointIndex = config.dataPointIndex === -1 ? 0 : config.dataPointIndex;

          if (seriesIndex !== -1) {
            const position = pointsArray[seriesIndex][dataPointIndex];

            tooltip.style.top = position[1] + 'px';
            tooltip.style.left = position[0] + 'px';
          }
        },
        click: function (event, chartContext, config) {
          const tooltip = chartContext.el.querySelector('.apexcharts-tooltip');
          const pointsArray = config.globals.pointsArray;
          const seriesIndex = config.seriesIndex;
          const dataPointIndex = config.dataPointIndex === -1 ? 0 : config.dataPointIndex;

          if (seriesIndex !== -1) {
            const position = pointsArray[seriesIndex][dataPointIndex];

            tooltip.style.top = position[1] + 'px';
            tooltip.style.left = position[0] + 'px';
          }
        },
      },
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'round',
      width: 2,
    },
    legend: {
      show: false,
    },
    colors: [chartColor],
    grid: {
      show: false,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      labels: {
        show: false,
        // eslint-disable-next-line
        formatter: function (value, ...args) {
          const [month, day] = new Date(value)
            .toLocaleString('en-US', {
              day: '2-digit',
              month: 'short',
            })
            .split(' ');
          return `${day} ${month}`;
        },
      },
    },
    tooltip: {
      x: {
        formatter: (val, opts) => {
          const timeLine = new Date(val * 1000);
          const date = `${timeLine.getFullYear()}.${timeLine.getMonth() + 1}.${timeLine.getDate()}`;
          return getLabel(val, opts) ? getLabel(val, opts) : date;
        },
      },
    },
    yaxis: {
      show: false,
    },
    // responsive: []
  },
  series,
  className,
  css,
  width,
  height,
}) => {
  const [optionsState] = useState<ApexOptions>(options);

  return (
    <View className={className} css={[styles.container, css]} width={width} height={height}>
      {isBrowser ? <ReactApexChart series={series} options={optionsState} width="100%" height="100%" /> : null}
    </View>
  );
};

export { Chart };
