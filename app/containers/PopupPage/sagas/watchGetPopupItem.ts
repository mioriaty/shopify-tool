import { call, put, select, takeLatest } from '@redux-saga/core/effects';
import { ClientStatisticDetailModel, statisticDetailService } from 'app/services/PopupService';
import { popupPageSelectors } from 'app/store/general/selectors';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetPopupItem } from '../actions/actionStatisticPopup';

type AddConfigRequest = ReturnType<typeof actionGetPopupItem.request>;

function* handleGetPopupItem({ payload }: AddConfigRequest) {
  try {
    const statisticItems: ClientStatisticDetailModel[] = yield select(popupPageSelectors.allData);
    const statisticItem = statisticItems.find(item => item.id === payload.id) as ClientStatisticDetailModel;

    if (!statisticItem?.config) {
      const statisticItem: ClientStatisticDetailModel = yield call(statisticDetailService.getItem, payload.id);
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
