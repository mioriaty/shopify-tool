import { ClientStatisticDetailModel, StatisticDetailStatus } from 'app/services/PopupService';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

// Action fetch data
export const actionFetchStatisticData = createAsyncAction([
  '@PopupPage/FetchStatisticDataRequest',
  '@PopupPage/FetchStatisticDataSuccess',
  '@PopupPage/FetchStatisticDataFailure',
])<{ endpoint: string | null; page: number }, { data: ClientStatisticDetailModel[]; maxPages: number; currentPage: number }, { message: string }>();

export const useActionFetchStatisticData = createDispatchAsyncAction(actionFetchStatisticData);

// Action get one popup item
export const actionGetPopupItem = createAsyncAction([
  '@PopupPage/actionGetPopupItemRequest',
  '@PopupPage/actionGetPopupItemSuccess',
  '@PopupPage/actionGetPopupItemFailure',
])<{ id: string; callback?: () => void }, { item: ClientStatisticDetailModel }, { message: string }>();

export const useActionGetPopupItem = createDispatchAsyncAction(actionGetPopupItem);

// Action delete item by ids
export const actionDeleteItems = createAsyncAction([
  '@PopupPage/actionDeleteItemsRequest',
  '@PopupPage/actionDeleteItemsSuccess',
  '@PopupPage/actionDeleteItemsFailure',
])<{ ids: string[] }, { ids: string[] }, { message: string }>();

export const useActionDeleteItems = createDispatchAsyncAction(actionDeleteItems);

// Action update status item by id
export const actionUpdateStatusItem = createAsyncAction([
  '@PopupPage/UpdateStatusItemRequest',
  '@PopupPage/UpdateStatusItemSuccess',
  '@PopupPage/UpdateStatusItemFailure',
])<{ id: string; status: StatisticDetailStatus }, { id: string; status: StatisticDetailStatus }, { message: string; id: string }>();

export const useActionUpdateStatusItem = createDispatchAsyncAction(actionUpdateStatusItem);

export const actionCreateNamePopup = createAction('@PopupPage/actionCreateNamePopup', (value: string) => ({ value }));
export const useCreateNamePopup = createDispatchAction(actionCreateNamePopup);
