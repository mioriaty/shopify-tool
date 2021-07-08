import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { ClientStatisticData, statisticListService } from 'app/services/DashboardService';
import { getActionType } from 'wiloke-react-core/utils';
import { actionFetchSmartBar } from '../actions/actionStatisticList';

export type ActionFetchRequest = ReturnType<typeof actionFetchSmartBar.request>;

function* handleFetchData({ payload }: ActionFetchRequest) {
  const { params } = payload;
  try {
    const response: ClientStatisticData[] = yield all([
      call(statisticListService.getSmartBar, params),
      call(statisticListService.getSmartBarClicks, params),
      call(statisticListService.getSmartBarSubscriber, params),
    ]);
    yield put(actionFetchSmartBar.success({ data: response }));
  } catch ({ message }) {
    yield put(actionFetchSmartBar.failure({ message }));
  }
}

export function* watchFetchSmartBar() {
  yield takeLatest(getActionType(actionFetchSmartBar.request), handleFetchData);
}
