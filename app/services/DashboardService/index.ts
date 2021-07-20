import { StatisticListService } from './DashboardService';
export type { ServerStatisticData } from './types/server';
export type { ClientStatisticData } from './types/client';

const statisticListService = new StatisticListService();

export { statisticListService };
