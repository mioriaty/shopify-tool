import { combineReducers } from 'redux';
import { reducerAuth } from './reducer/reducerAuth';
import { watchGetToken } from './sagas/watchLogin';

const reducersAuth = combineReducers({
  auth: reducerAuth,
});

const sagasAuth = [watchGetToken];

export { reducersAuth, sagasAuth };
