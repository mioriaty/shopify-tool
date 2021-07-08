import { combineReducers } from 'redux';
import { PricingPage } from './PricingPage';
import { reducerPlans } from './reducers/reducerPlans';
import { watchGetPlans } from './sagas/watchGetPlans';

const reducersPricingPage = combineReducers({
  plan: reducerPlans,
});

const sagasPricingPage = [watchGetPlans];

export { PricingPage, reducersPricingPage, sagasPricingPage };
