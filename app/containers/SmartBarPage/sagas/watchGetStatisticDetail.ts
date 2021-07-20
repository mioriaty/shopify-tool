import { call, put, takeLatest } from '@redux-saga/core/effects';
import { ServerSmartBarService, smartBarService } from 'app/services/SmartBarService';
import { getActionType } from 'wiloke-react-core/utils';
import { actionFetchStatisticData } from '../actions/actionStatisticPopup';

export type GetStatisticDataRequest = ReturnType<typeof actionFetchStatisticData.request>;

function* handleFetchData({ payload }: GetStatisticDataRequest) {
  const { page } = payload;
  try {
    const response: ServerSmartBarService = yield call(smartBarService.getItems, page);
    yield put(actionFetchStatisticData.success({ data: response.data.items, maxPages: response.data.maxPages, currentPage: page }));
  } catch (error) {
    yield put(actionFetchStatisticData.failure({ message: error.message }));
  }
}

export function* watchGetStatisticData() {
  yield takeLatest(getActionType(actionFetchStatisticData.request), handleFetchData);
}
