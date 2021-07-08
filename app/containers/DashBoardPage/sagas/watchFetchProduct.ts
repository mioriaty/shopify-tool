import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { ClientStatisticData, statisticListService } from 'app/services/DashboardService';
import { getActionType } from 'wiloke-react-core/utils';
import { actionFetchStatisticProducts } from '../actions/actionStatisticList';

export type ActionFetchRequest = ReturnType<typeof actionFetchStatisticProducts.request>;

function* handleFetchData({ payload }: ActionFetchRequest) {
  const { params } = payload;
  try {
    const response: ClientStatisticData[] = yield all([
      call(statisticListService.getProducts, params),
      call(statisticListService.getProductSale, params),
      call(statisticListService.getProductReviews, params),
    ]);
    yield put(actionFetchStatisticProducts.success({ data: response }));
  } catch ({ message }) {
    yield put(actionFetchStatisticProducts.failure({ message }));
  }
}

export function* watchFetchStatisticProducts() {
  yield takeLatest(getActionType(actionFetchStatisticProducts.request), handleFetchData);
}
