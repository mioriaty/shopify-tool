import { ClientPlan } from 'app/services/PricingService';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const actionGetPlans = createAsyncAction(['@PricingPage/getPlansRequest', '@PricingPage/getPlansSuccess', '@PricingPage/getPlansFailure'])<
  null,
  { plans: ClientPlan },
  { message: string }
>();

export const useGetPlans = createDispatchAsyncAction(actionGetPlans);
