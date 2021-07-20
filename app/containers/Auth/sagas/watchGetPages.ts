import { authService, ClientStoreFrontPage } from 'app/services/AuthService';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetStoreFrontPages } from '../actions/actionPages';

type PagesRequest = ReturnType<typeof actionGetStoreFrontPages.request>;

function* handleGetPages({ payload }: PagesRequest) {
  const { app, shopName } = payload;
  try {
    const response: ClientStoreFrontPage[] = yield call(authService.getStoreFrontPages, app, shopName);
    yield put(actionGetStoreFrontPages.success({ pages: response }));
  } catch (error) {
    yield put(actionGetStoreFrontPages.failure({ message: error }));
  }
}

export function* watchGetStoreFrontPages() {
  yield takeEvery(getActionType(actionGetStoreFrontPages.request), handleGetPages);
}
