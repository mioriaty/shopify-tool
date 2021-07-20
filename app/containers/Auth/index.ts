import { combineReducers } from 'redux';
import { reducerAuth } from './reducer/reducerAuth';
import { watchGetStoreFrontPages } from './sagas/watchGetPages';
import { watchGetToken } from './sagas/watchLogin';
import { watchRenewToken } from './sagas/watchRenewToken';

const reducersAuth = combineReducers({
  auth: reducerAuth,
});

const sagasAuth = [watchGetToken, watchRenewToken, watchGetStoreFrontPages];

export { reducersAuth, sagasAuth };
