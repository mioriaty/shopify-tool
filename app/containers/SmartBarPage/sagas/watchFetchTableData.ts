import { smartBarService } from 'app/services/SmartBarService';
import { ClientTableSubscriberModel } from 'app/services/SubscriberPageService';

import { call, put, takeLatest } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { actionFetchTableSmartBar } from '../actions/actionTable';

type TablResquet = ReturnType<typeof actionFetchTableSmartBar.request>;

function* handleFetchData({ payload }: TablResquet) {
  const { id } = payload;
  try {
    const response: ClientTableSubscriberModel[] = yield call(smartBarService.getTableSmartBarData, id);
    yield put(actionFetchTableSmartBar.success({ id, data: response }));
  } catch (error) {
    yield put(actionFetchTableSmartBar.failure({ id, message: error.message }));
  }
}

export function* watchFetchTableData() {
  yield takeLatest(getActionType(actionFetchTableSmartBar.request), handleFetchData);
}
