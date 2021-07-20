import { statisticDetailService } from 'app/services/PopupService';
import { ClientTableSubscriberModel } from 'app/services/SubscriberPageService';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { actionFetchTable } from '../actions/actionTable';

type TablResquet = ReturnType<typeof actionFetchTable.request>;

function* handleFetchData({ payload }: TablResquet) {
  const { id } = payload;
  try {
    const response: ClientTableSubscriberModel[] = yield call(statisticDetailService.getPopupTableData, id);
    yield put(actionFetchTable.success({ id, data: response }));
  } catch (error) {
    yield put(actionFetchTable.failure({ id, message: error.message }));
  }
}

export function* watchFetchTableData() {
  yield takeLatest(getActionType(actionFetchTable.request), handleFetchData);
}
