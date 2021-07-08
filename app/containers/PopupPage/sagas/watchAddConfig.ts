import { call, put, takeLatest } from '@redux-saga/core/effects';
import { ClientStatisticDetailModel, statisticDetailService } from 'app/services/PopupService';
import { select } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { actionAddConfig } from '../actions/actionConfig';

type AddConfigRequest = ReturnType<typeof actionAddConfig.request>;

function* handleAddConfig({ payload }: AddConfigRequest) {
  try {
    const token: string = yield select((state: AppState) => state.authPage.auth.loginToken);
    if (token) {
      const statisticItem: ClientStatisticDetailModel = yield call(statisticDetailService.addItem, payload.config, payload.name);
      yield put(actionAddConfig.success({ item: statisticItem }));
    }
  } catch ({ message }) {
    actionAddConfig.failure({ message });
  }
}

function* watchAddConfig() {
  yield takeLatest(getActionType(actionAddConfig.request), handleAddConfig);
}

export { watchAddConfig };
