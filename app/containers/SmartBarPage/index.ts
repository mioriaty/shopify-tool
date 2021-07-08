import { combineReducers } from 'redux';
import { reducerPopupPage as reducerStatisticDetail } from './reducers/reducerSmartBarPage';
import { SmartBarPage } from './SmartBarPage';
import { watchGetStatisticData } from './sagas/watchGetStatisticDetail';
import { watchUpdateStatusItem } from './sagas/watchUpdateStatusItem';
import { watchAddConfig } from './sagas/watchAddConfig';
import { watchDeleteItems } from './sagas/watchDeleteItems';
import { watchGetPopupItem } from './sagas/watchGetPopupItem';
import { watchUpdateConfig } from './sagas/watchUpdateConfig';
import { reducerTab } from './reducers/reducerTab';
import { reducerTableData } from './reducers/reducerTable';
import { watchFetchTableData } from './sagas/watchFetchTableData';

const reducersSmartBarPage = combineReducers({
  smartBarState: reducerStatisticDetail,
  tab: reducerTab,
  table: reducerTableData,
});

const sagaSmartBarPage = [
  watchGetStatisticData,
  watchUpdateStatusItem,
  watchAddConfig,
  watchDeleteItems,
  watchGetPopupItem,
  watchUpdateConfig,
  watchFetchTableData,
];

export { SmartBarPage, reducersSmartBarPage, sagaSmartBarPage };
