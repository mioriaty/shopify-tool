import { call, put, takeLatest } from '@redux-saga/core/effects';
import { smartBarService } from 'app/services/SmartBarService';
import { getActionType } from 'wiloke-react-core/utils';
import { actionEditConfig } from '../actions/actionConfig';

type EditConfigRequest = ReturnType<typeof actionEditConfig.request>;

function* handleUpdateConfig({ payload }: EditConfigRequest) {
  const { config, id } = payload;
  try {
    yield call(smartBarService.updateConfigItem, id, config);
    yield put(actionEditConfig.success({ id, config }));
  } catch (error) {
    yield put(actionEditConfig.failure({ message: error, id }));
  }
}

export function* watchUpdateConfig() {
  yield takeLatest(getActionType(actionEditConfig.request), handleUpdateConfig);
}
