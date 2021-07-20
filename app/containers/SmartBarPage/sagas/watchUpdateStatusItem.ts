import { call, put } from '@redux-saga/core/effects';
import { smartBarService } from 'app/services/SmartBarService';
import { takeEvery } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { actionUpdateStatusItem } from '../actions/actionStatisticPopup';

type UpdateStatisticDataRequest = ReturnType<typeof actionUpdateStatusItem.request>;

function* handleUpdateData({ payload }: UpdateStatisticDataRequest) {
  try {
    yield call(smartBarService.updateStatusItem, payload.id, payload.status);
    yield put(actionUpdateStatusItem.success({ id: payload.id, status: payload.status }));
  } catch (error) {
    yield put(actionUpdateStatusItem.failure({ message: error.message, id: payload.id }));
  }
}

export function* watchUpdateStatusItem() {
  yield takeEvery(getActionType(actionUpdateStatusItem.request), handleUpdateData);
}
