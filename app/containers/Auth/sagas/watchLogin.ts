import { authService, ServerTokenLoginData } from 'app/services/AuthService';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { actionLogin } from '../actions/actionAuth';

type AuthRequest = ReturnType<typeof actionLogin.request>;

function* handleGetToken({ payload }: AuthRequest) {
  const { app, shopName, email } = payload;
  try {
    const response: ServerTokenLoginData = yield call(authService.login, shopName, email, app);
    yield put(actionLogin.success({ token: response.accessToken, refreshToken: response.refreshToken }));
  } catch (error) {
    yield put(actionLogin.failure({ message: error }));
  }
}
export function* watchGetToken() {
  yield takeEvery(getActionType(actionLogin.request), handleGetToken);
}
