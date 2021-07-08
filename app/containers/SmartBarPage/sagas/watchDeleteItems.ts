import { call, put, takeLatest } from '@redux-saga/core/effects';
import { smartBarService } from 'app/services/SmartBarService';
import { getActionType } from 'wiloke-react-core/utils';
import { actionDeleteItems } from '../actions/actionStatisticPopup';

type DeleteItemsRequest = ReturnType<typeof actionDeleteItems.request>;

function* handleDeleteItems({ payload }: DeleteItemsRequest) {
  try {
    yield call(smartBarService.deleteItems, payload.ids);

    yield put(actionDeleteItems.success({ ids: payload.ids }));
  } catch ({ message }) {
    actionDeleteItems.failure({ message });
  }
}

export function* watchDeleteItems() {
  yield takeLatest(getActionType(actionDeleteItems.request), handleDeleteItems);
}
