import { ClientPlan } from 'app/services/PricingService';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionGetPlans, actionGetPlanURL } from '../actions/actionPlans';

type ReducerPlansAction = ActionTypes<typeof actionGetPlans | typeof actionGetPlanURL>;

interface ReducerPlansState {
  plans: ClientPlan;
  planStatus: Status;
  message: string;
  redirectUrl: string;
  redirectStatus: Record<ClientPlan, Status>;
}

const initialState: ReducerPlansState = {
  message: '',
  plans: 'free',
  planStatus: 'idle',
  redirectUrl: '',
  redirectStatus: {
    originalFree: 'idle',
    free: 'idle',
    silver: 'idle',
    gold: 'idle',
  },
};

const reducerPlans = createReducer<ReducerPlansState, ReducerPlansAction>(initialState, [
  handleAction('@PricingPage/getPlansRequest', ({ state }) => ({
    ...state,
    planStatus: 'loading',
  })),
  handleAction('@PricingPage/getPlansSuccess', ({ state, action }) => {
    const { plans } = action.payload;
    state.planStatus = 'success';
    state.plans = plans;
  }),
  handleAction('@PricingPage/getPlansFailure', ({ state, action }) => {
    const { message } = action.payload;
    state.planStatus = 'failure';
    state.message = message;
  }),
  // get redirect link
  handleAction('@PricingPage/getPlanURLRequest', ({ state, action }) => {
    const { plan } = action.payload;
    state.redirectStatus[plan] = 'loading';
  }),
  handleAction('@PricingPage/getPlanURLSuccess', ({ state, action }) => {
    const { redirectTo, plan } = action.payload;
    state.redirectStatus[plan] = 'success';
    state.redirectUrl = redirectTo;
  }),
  handleAction('@PricingPage/getPlanURLFailure', ({ state, action }) => {
    const { message, plan } = action.payload;
    state.redirectStatus[plan] = 'failure';
    state.redirectUrl = '';
    state.message = message;
  }),
]);

export { reducerPlans };
