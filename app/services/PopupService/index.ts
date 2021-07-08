import { StatisticDetailService } from './PopupService';
export type { ServerStatisticDetail, StatisticDetailModel, StatisticDetailStatus } from './types/server';
export type { ClientStatisticDetailModel } from './types/client';

const statisticDetailService = new StatisticDetailService();
export { statisticDetailService };
