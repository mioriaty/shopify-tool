import { ClientTableSubscriberModel } from 'app/services/SubscriberPageService/index';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const actionFetchTableSubscriber = createAsyncAction([
  '@SubscriberPage/fetchTableRequest',
  '@SubscriberPage/fetchTableSuccess',
  '@SubscriberPage/fetchTableFailure',
])<null, { data: ClientTableSubscriberModel[] }, { message: string }>();

export const useFetchTableSubscriber = createDispatchAsyncAction(actionFetchTableSubscriber);
