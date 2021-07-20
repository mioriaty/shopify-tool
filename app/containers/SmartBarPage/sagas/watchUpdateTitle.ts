import { call, put } from '@redux-saga/core/effects';
import { smartBarService } from 'app/services/SmartBarService';
import { takeEvery } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { actionUpdateTitleSmartBar } from '../actions/actionStatisticPopup';

type UpdateStatisticDataRequest = ReturnType<typeof actionUpdateTitleSmartBar.request>;

function* handleUpdateData({ payload }: UpdateStatisticDataRequest) {
  try {
    yield call(smartBarService.updateTitleItem, payload.title, payload.id);
    yield put(actionUpdateTitleSmartBar.success({ id: payload.id, title: payload.title }));
  } catch (error) {
    yield put(actionUpdateTitleSmartBar.failure({ message: error.message, id: payload.id }));
  }
}

export function* watchUpdateTitleItem() {
  yield takeEvery(getActionType(actionUpdateTitleSmartBar.request), handleUpdateData);
}
