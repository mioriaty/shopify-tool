import { call, put, takeLatest } from '@redux-saga/core/effects';
import { statisticDetailService } from 'app/services/PopupService';
import { getActionType } from 'wiloke-react-core/utils';
import { actionDeleteItems } from '../actions/actionStatisticPopup';

type DeleteItemsRequest = ReturnType<typeof actionDeleteItems.request>;

function* handleDeleteItems({ payload }: DeleteItemsRequest) {
  try {
    yield call(statisticDetailService.deleteItems, payload.ids);

    yield put(actionDeleteItems.success({ ids: payload.ids }));
  } catch ({ message }) {
    yield put(actionDeleteItems.failure({ message }));
  }
}

function* watchDeleteItems() {
  yield takeLatest(getActionType(actionDeleteItems.request), handleDeleteItems);
}
export { watchDeleteItems };
