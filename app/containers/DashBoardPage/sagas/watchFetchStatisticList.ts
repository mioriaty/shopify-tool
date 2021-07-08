import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { ClientStatisticData, statisticListService } from 'app/services/DashboardService';
import { getActionType } from 'wiloke-react-core/utils';
import { actionFetchStatisticList } from '../actions/actionStatisticList';

export type ActionFetchRequest = ReturnType<typeof actionFetchStatisticList.request>;

function* handleFetchData({ payload }: ActionFetchRequest) {
  const { params } = payload;
  try {
    const response: ClientStatisticData[] = yield all([
      call(statisticListService.getStatisticList, params),
      call(statisticListService.getPopupClicks, params),
      call(statisticListService.getPopupSubscriber, params),
    ]);

    yield put(actionFetchStatisticList.success({ data: response }));
  } catch ({ message }) {
    yield put(actionFetchStatisticList.failure({ message }));
  }
}

export function* watchFetchStatisticList() {
  yield takeLatest(getActionType(actionFetchStatisticList.request), handleFetchData);
}
