import { ApexOptions } from 'apexcharts';
import { LineAwesomeName } from 'wiloke-react-core';

export interface StatisticListModel {
  id: string;
  icon: LineAwesomeName;
  colorIcon: string;
  views: string;
  title: string;
  chartColor?: string;
  chartData: ApexOptions['series'];
}

export interface StatisticListSectionModel {
  id: string;
  title: string;
  description: string;
  data: StatisticListModel[];
}
