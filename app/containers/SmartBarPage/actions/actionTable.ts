import { ClientTableSubscriberModel } from 'app/services/SubscriberPageService';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const actionFetchTableSmartBar = createAsyncAction([
  '@SmartBarPage/fetchTableRequest',
  '@SmartBarPage/fetchTableSuccess',
  '@SmartBarPage/fetchTableFailure',
])<{ id: string }, { data: ClientTableSubscriberModel[]; id: string }, { message: string; id: string }>();

export const useFetchTableSmartBar = createDispatchAsyncAction(actionFetchTableSmartBar);
