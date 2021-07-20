import { Option } from 'app/components/SelectAntd';
import { i18n } from 'app/translation';

export const dateOptions = (): Option[] => [
  {
    label: `${i18n.t('today')}`,
    value: 'today',
  },
  {
    label: `${i18n.t('yesterday')}`,
    value: 'yesterday',
  },
  {
    label: `${i18n.t('lastWeek')}`,
    value: 'lastWeek',
  },
  {
    label: `${i18n.t('lastMonth')}`,
    value: 'lastMonth',
  },
  {
    label: `${i18n.t('thisWeek')}`,
    value: 'thisWeek',
  },
  {
    label: `${i18n.t('thisMonth')}`,
    value: 'thisMonth',
  },
  {
    label: `${i18n.t('customRange')}`,
    value: 'custom-range',
  },
];

export const statisticOption = (): Option[] => [
  {
    label: `${i18n.t('all')}`,
    value: 'all',
  },
  {
    label: 'Popup',
    value: 'popup',
  },
  {
    label: 'Smart Bar',
    value: 'smartBar',
  },
];
