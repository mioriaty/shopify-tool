import { ClientPlan } from './client';

export interface ServerPlanResponse {
  data: {
    myshopkit: ClientPlan;
  };
  message: 'success';
  status: 'success';
}
