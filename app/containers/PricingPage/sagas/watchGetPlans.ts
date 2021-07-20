import { pricingService, ServerPlanResponse } from 'app/services/PricingService';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetPlans } from '../actions/actionPlans';

// type PlansRequest = ReturnType<typeof actionGetPlans.request>;

function* handleGetPlans() {
  try {
    const response: ServerPlanResponse = yield call(pricingService.getPlan);
    yield put(actionGetPlans.success({ plans: response.data.plan }));
  } catch (error) {
    yield put(actionGetPlans.failure({ message: error }));
  }
}

export function* watchGetPlans() {
  yield takeLatest(getActionType(actionGetPlans.request), handleGetPlans);
}
