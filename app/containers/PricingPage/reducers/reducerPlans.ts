import { ClientPlan } from 'app/services/PricingService';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionGetPlans } from '../actions/actionPlans';

type ReducerPlansAction = ActionTypes<typeof actionGetPlans>;

interface ReducerPlansState {
  plans: ClientPlan;
  planStatus: Status;
  message: string;
}

const initialState: ReducerPlansState = {
  message: '',
  planStatus: 'idle',
  plans: 'free',
};

const reducerPlans = createReducer<ReducerPlansState, ReducerPlansAction>(initialState, [
  handleAction('@PricingPage/getPlansRequest', ({ state }) => {
    state.planStatus = 'loading';
  }),
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
]);

export { reducerPlans };
