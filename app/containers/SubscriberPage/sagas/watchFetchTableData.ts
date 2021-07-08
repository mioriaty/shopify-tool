import { ClientTableSubscriberModel, subscriberPageService } from 'app/services/SubscriberPageService';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { actionFetchTableSubscriber } from '../actions/actionTable';

function* handleFetchTable() {
  try {
    const response: ClientTableSubscriberModel[] = yield call(subscriberPageService.getTableSubscriber);
    yield put(actionFetchTableSubscriber.success({ data: response }));
  } catch (error) {
    actionFetchTableSubscriber.failure({ message: error.message });
  }
}

export function* watchFetchTableData() {
  yield takeLatest(getActionType(actionFetchTableSubscriber.request), handleFetchTable);
}
