import { i18n } from 'app/translation';
import { v4 } from 'uuid';

export const rows = [
  {
    id: v4(),
    title: i18n.t('monthly'),
    free: `0$/${i18n.t('monthly')}`,
    basic: `14.99$/${i18n.t('monthly')}`,
    pro: `29.99$/${i18n.t('monthly')}`,
    premium: `59.99$/${i18n.t('monthly')}`,
  },
  {
    id: v4(),
    title: i18n.t('yearly'),
    free: `-`,
    basic: `149.99$/${i18n.t('yearly')}`,
    pro: `299.99$/${i18n.t('yearly')}`,
    premium: `599.99$/${i18n.t('yearly')}`,
  },
  {
    id: v4(),
    title: i18n.t('support'),
    free: `Email support`,
    basic: `Live chat`,
    pro: `24/7 Live chat`,
    premium: `24/7 Live chat`,
  },
  {
    id: v4(),
    title: i18n.t('pagesLimit'),
    free: `Standard page only(Limit 3 pages)`,
    basic: `All page type(limit 10 pages)`,
    pro: `All page type(limit 50 pages)`,
    premium: `All page type(Unlimited)`,
  },
  {
    id: v4(),
    title: i18n.t('editCode'),
    free: `-`,
    basic: `✔`,
    pro: `✔`,
    premium: `✔`,
  },
];
