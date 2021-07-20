import { combineReducers } from 'redux';
import { reducerTableData } from './reducers/reducerTable';
import { watchFetchTableData } from './sagas/watchFetchTableData';
import { SubscriberPage } from './SubscriberPage';

const reducersSubscriberPage = combineReducers({
  table: reducerTableData,
});

const sagasSubscriberPage = [watchFetchTableData];

export { SubscriberPage, reducersSubscriberPage, sagasSubscriberPage };
