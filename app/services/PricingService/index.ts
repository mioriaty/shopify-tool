import { PricingService } from './PricingService';

export type { ClientDiscount, ClientPlan } from './types/client';
export type { ServerPlanResponse, ServerPlanUrlResponse } from './types/server';

const pricingService = new PricingService();

export { pricingService };
