import { authService, ServerTokenLoginData } from 'app/services/AuthService';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { actionRenewToken } from '../actions/actionAuth';

type AuthRequest = ReturnType<typeof actionRenewToken.request>;

function* handleGetToken({ payload }: AuthRequest) {
  const { accessToken, refreshToken } = payload;
  try {
    const response: ServerTokenLoginData = yield call(authService.renewToken, accessToken, refreshToken);
    yield put(actionRenewToken.success({ accessToken: response.accessToken }));
  } catch (error) {
    yield put(actionRenewToken.failure({ message: error }));
  }
}
export function* watchRenewToken() {
  yield takeEvery(getActionType(actionRenewToken.request), handleGetToken);
}
