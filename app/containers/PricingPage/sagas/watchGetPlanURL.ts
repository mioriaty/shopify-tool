import { pricingService, ServerPlanUrlResponse } from 'app/services/PricingService';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetPlanURL } from '../actions/actionPlans';

type PlansRequest = ReturnType<typeof actionGetPlanURL.request>;

function* handleGetPlanURL({ payload }: PlansRequest) {
  const { plan } = payload;
  try {
    const response: ServerPlanUrlResponse = yield call(pricingService.getPlanUrl, plan);
    yield put(actionGetPlanURL.success({ redirectTo: response.data.redirectTo, plan }));
  } catch (error) {
    yield put(actionGetPlanURL.failure({ message: error, plan }));
  }
}

export function* watchGetPlanURL() {
  yield takeLatest(getActionType(actionGetPlanURL.request), handleGetPlanURL);
}
