import { ClientTableSubscriberModel } from 'app/services/SubscriberPageService';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const actionFetchTable = createAsyncAction(['@PopupPage/fetchTableRequest', '@PopupPage/fetchTableSuccess', '@PopupPage/fetchTableFailure'])<
  { id: string },
  { data: ClientTableSubscriberModel[]; id: string },
  { message: string; id: string }
>();

export const useFetchTablePopup = createDispatchAsyncAction(actionFetchTable);
