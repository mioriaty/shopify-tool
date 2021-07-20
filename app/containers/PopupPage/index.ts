import { combineReducers } from 'redux';
import { reducerPopupPage } from './reducers/reducerPopupPage';
import { PopupPage } from './PopupPage';
import { watchGetStatisticData } from './sagas/watchGetStatisticDetail';
import { watchUpdateStatusItem } from './sagas/watchUpdateStatusItem';
import { watchAddConfig } from './sagas/watchAddConfig';
import { watchDeleteItems } from './sagas/watchDeleteItems';
import { watchGetPopupItem } from './sagas/watchGetPopupItem';
import { watchUpdateConfig } from './sagas/watchUpdateConfig';
import { reducerTab } from './reducers/reducerTab';
import { reducerTableData } from './reducers/reducerTable';
import { watchFetchTableData } from './sagas/watchFetchTableData';
import { watchUpdateTitleItem } from './sagas/watchUpdateTitle';

const reducersPopupPage = combineReducers({
  statisticState: reducerPopupPage,
  tab: reducerTab,
  table: reducerTableData,
});

const sagaPopupPage = [
  watchGetStatisticData,
  watchUpdateStatusItem,
  watchUpdateTitleItem,
  watchFetchTableData,
  watchUpdateConfig,
  watchGetPopupItem,
  watchDeleteItems,
  watchAddConfig,
];

export { PopupPage, reducersPopupPage, sagaPopupPage };
