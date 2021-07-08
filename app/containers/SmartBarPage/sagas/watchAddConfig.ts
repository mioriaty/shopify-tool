import { call, put, takeLatest } from '@redux-saga/core/effects';
import { ClientSmartBarServiceModel, smartBarService } from 'app/services/SmartBarService';
import { getActionType } from 'wiloke-react-core/utils';
import { actionAddConfig } from '../actions/actionConfig';

type AddConfigRequest = ReturnType<typeof actionAddConfig.request>;

function* handleAddConfig({ payload }: AddConfigRequest) {
  try {
    const statisticItem: ClientSmartBarServiceModel = yield call(smartBarService.addItem, payload.config, payload.name);
    yield put(actionAddConfig.success({ item: statisticItem }));
  } catch ({ message }) {
    actionAddConfig.failure({ message });
  }
}

export function* watchAddConfig() {
  yield takeLatest(getActionType(actionAddConfig.request), handleAddConfig);
}
