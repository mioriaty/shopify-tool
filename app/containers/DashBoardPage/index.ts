import { combineReducers } from 'redux';
import { reducerDashboardPage } from './reducers/reducerDashboardPage';
import { DashBoardPage } from './DashBoardPage';
import { watchFetchStatisticList } from './sagas/watchFetchStatisticList';
import { reducerFilter } from './reducers/reducerFilter';
import { watchFetchStatisticProducts } from './sagas/watchFetchProduct';
import { watchFetchSmartBar } from './sagas/watchFetchSmartBar';

const reducersDashboardPage = combineReducers({
  statisticList: reducerDashboardPage,
  filter: reducerFilter,
});

const sagaDashboardPage = [watchFetchStatisticList, watchFetchStatisticProducts, watchFetchSmartBar];

export { DashBoardPage, reducersDashboardPage, sagaDashboardPage };
