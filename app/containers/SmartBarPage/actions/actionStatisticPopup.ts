import { ClientSmartBarServiceModel, SmartBarServiceStatus } from 'app/services/SmartBarService';
import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

// Action fetch data
export const actionFetchStatisticData = createAsyncAction([
  '@SmartBarPage/FetchStatisticDataRequest',
  '@SmartBarPage/FetchStatisticDataSuccess',
  '@SmartBarPage/FetchStatisticDataFailure',
])<{ endpoint: string | null; page: number }, { data: ClientSmartBarServiceModel[]; maxPages: number; currentPage: number }, { message: string }>();

export const useActionFetchStatisticData = createDispatchAsyncAction(actionFetchStatisticData);

// Action get one popup item
export const actionGetPopupItem = createAsyncAction([
  '@SmartBarPage/actionGetPopupItemRequest',
  '@SmartBarPage/actionGetPopupItemSuccess',
  '@SmartBarPage/actionGetPopupItemFailure',
])<{ id: string; callback?: () => void }, { item: ClientSmartBarServiceModel }, { message: string }>();

export const useActionGetPopupItem = createDispatchAsyncAction(actionGetPopupItem);

// Action delete item by ids
export const actionDeleteItems = createAsyncAction([
  '@SmartBarPage/actionDeleteItemsRequest',
  '@SmartBarPage/actionDeleteItemsSuccess',
  '@SmartBarPage/actionDeleteItemsFailure',
])<{ ids: string[] }, { ids: string[] }, { message: string }>();

export const useActionDeleteItems = createDispatchAsyncAction(actionDeleteItems);

// Action update status item by id
export const actionUpdateStatusItem = createAsyncAction([
  '@SmartBarPage/UpdateStatusItemRequest',
  '@SmartBarPage/UpdateStatusItemSuccess',
  '@SmartBarPage/UpdateStatusItemFailure',
])<{ id: string; status: SmartBarServiceStatus }, { id: string; status: SmartBarServiceStatus }, { message: string; id: string }>();

export const useActionUpdateStatusItem = createDispatchAsyncAction(actionUpdateStatusItem);

export const actionCreateNameSmartBar = createAction('@SmartBarPage/actionCreateNameSmartBar', (value: string) => ({ value }));
export const useCreateNameSmartBar = createDispatchAction(actionCreateNameSmartBar);

export const actionUpdateTitleSmartBar = createAsyncAction([
  '@SmartBarPage/UpdateSmartBarTitleRequest',
  '@SmartBarPage/UpdateSmartBarTitleSuccess',
  '@SmartBarPage/UpdateSmartBarTitleFailure',
])<{ id: string; title: string }, { id: string; title: string }, { id: string; message: string }>();

export const useUpdateTitleSmartBar = createDispatchAsyncAction(actionUpdateTitleSmartBar);
