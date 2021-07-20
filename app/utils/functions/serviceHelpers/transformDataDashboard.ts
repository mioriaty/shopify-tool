import { ApexOptions } from 'apexcharts';
import { ServerStatisticData } from 'app/services/DashboardService';
import { i18n } from 'app/translation';
import { transformTitle } from './transformTitle';

export function transformDataDashboard(response: ServerStatisticData) {
  const from = response.data.timeline.map(item => Number(item.from));
  const to = response.data.timeline.map(item => (item.to !== item.from && item.to ? Number(item.to) : ''));

  return {
    ...response.data,
    from,
    to,
    title: response.data.type ? transformTitle(response.data.type) : '',
    timeline: [
      {
        name: i18n.t('sum'),
        data: response.data.timeline.map(item => {
          return [Number(item.from), item.summary];
        }),
      },
    ] as ApexOptions['series'],
  };
}
