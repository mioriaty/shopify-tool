import { call, put } from '@redux-saga/core/effects';
import { statisticDetailService } from 'app/services/PopupService';
import { takeEvery } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { actionUpdateTitlePopup } from '../actions/actionStatisticPopup';

type UpdateStatisticDataRequest = ReturnType<typeof actionUpdateTitlePopup.request>;

function* handleUpdateData({ payload }: UpdateStatisticDataRequest) {
  try {
    yield call(statisticDetailService.updateTitleItem, payload.title, payload.id);
    yield put(actionUpdateTitlePopup.success({ id: payload.id, title: payload.title }));
  } catch (error) {
    yield put(actionUpdateTitlePopup.failure({ message: error.message, id: payload.id }));
  }
}

export function* watchUpdateTitleItem() {
  yield takeEvery(getActionType(actionUpdateTitlePopup.request), handleUpdateData);
}
