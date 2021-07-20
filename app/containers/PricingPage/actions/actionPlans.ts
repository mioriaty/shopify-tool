import { ClientPlan } from 'app/services/PricingService';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const actionGetPlans = createAsyncAction(['@PricingPage/getPlansRequest', '@PricingPage/getPlansSuccess', '@PricingPage/getPlansFailure'])<
  null,
  { plans: ClientPlan },
  { message: string }
>();

export const useGetPlans = createDispatchAsyncAction(actionGetPlans);

export const actionGetPlanURL = createAsyncAction([
  '@PricingPage/getPlanURLRequest',
  '@PricingPage/getPlanURLSuccess',
  '@PricingPage/getPlanURLFailure',
])<{ plan: ClientPlan }, { plan: ClientPlan; redirectTo: string }, { plan: ClientPlan; message: string }>();

export const useGetPlanURL = createDispatchAsyncAction(actionGetPlanURL);
