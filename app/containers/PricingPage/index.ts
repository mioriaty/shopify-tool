import { combineReducers } from 'redux';
import { PricingPage } from './PricingPage';
import { reducerPlans } from './reducers/reducerPlans';
import { watchGetPlans } from './sagas/watchGetPlans';
import { watchGetPlanURL } from './sagas/watchGetPlanURL';

const reducersPricingPage = combineReducers({
  plan: reducerPlans,
});

const sagasPricingPage = [watchGetPlans, watchGetPlanURL];

export { PricingPage, reducersPricingPage, sagasPricingPage };
