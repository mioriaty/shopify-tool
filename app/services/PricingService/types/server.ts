import { ClientPlan } from './client';

export interface ServerPlanResponse {
  data: {
    plan: ClientPlan;
  };
  message: string;
  status: string;
}

export interface ServerPlanUrlResponse {
  data: {
    /** redirectTo là đường dẫn chuyển trang*/
    redirectTo: string;
  };
  message: string;
  status: string;
}
