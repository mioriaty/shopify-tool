import { ApexOptions } from 'apexcharts';

const chartData: ApexOptions['series'] = [
  {
    name: 'Page View',
    data: [
      [new Date('1 Jan 2020').getTime(), 35],
      [new Date('3 Jan 2020').getTime(), 62],
      [new Date('4 Jan 2020').getTime(), 42],
    ],
  },
];

export default chartData;
