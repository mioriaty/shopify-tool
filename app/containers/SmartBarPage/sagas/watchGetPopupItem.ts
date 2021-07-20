import { call, put, select, takeLatest } from '@redux-saga/core/effects';
import { ClientSmartBarServiceModel, smartBarService } from 'app/services/SmartBarService';
import { smartBarPageSelectors } from 'app/store/general/selectors';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetPopupItem } from '../actions/actionStatisticPopup';

type AddConfigRequest = ReturnType<typeof actionGetPopupItem.request>;

function* handleGetPopupItem({ payload }: AddConfigRequest) {
  try {
    const statisticItems: ClientSmartBarServiceModel[] = yield select(smartBarPageSelectors.allData);
    const statisticItem = statisticItems.find(item => item.id === payload.id) as ClientSmartBarServiceModel;

    if (!statisticItem?.config) {
      const statisticItem: ClientSmartBarServiceModel = yield call(smartBarService.getItem, payload.id);
      yield put(actionGetPopupItem.success({ item: statisticItem }));
    }
    payload.callback?.();
  } catch (err) {
    yield put(actionGetPopupItem.failure({ message: 'err' }));
  }
}

export function* watchGetPopupItem() {
  yield takeLatest(getActionType(actionGetPopupItem.request), handleGetPopupItem);
}
