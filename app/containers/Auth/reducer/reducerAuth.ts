import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionGetShopName, actionLogin, logOut, updateToken } from '../actions/actionAuth';

type ReducerAuthAction = ActionTypes<typeof updateToken | typeof logOut | typeof actionLogin | typeof actionGetShopName>;

interface ReducerAuthInterface {
  renewToken: string;
  loginToken: string;
  refreshToken: string;
  loginStatus: Status;
  message: string;
  isLoggedIn: boolean;
  shopName: string;
}

const initialState: ReducerAuthInterface = {
  renewToken: '',
  loginToken: '',
  refreshToken: '',
  loginStatus: 'idle',
  message: '',
  isLoggedIn: false,
  shopName: '',
};

const reducerAuth = createReducer<ReducerAuthInterface, ReducerAuthAction>(initialState, [
  handleAction('@Auth/updateToken', ({ state, action }) => {
    const { payload } = action;
    state.renewToken = payload.accessToken;
  }),
  handleAction('@Auth/loginRequest', ({ state }) => {
    state.loginStatus = 'loading';
  }),
  handleAction('@Auth/loginSuccess', ({ state, action }) => {
    const { token, refreshToken } = action.payload;
    state.loginStatus = 'success';
    state.loginToken = token;
    state.refreshToken = refreshToken;
    state.isLoggedIn = true;
  }),
  handleAction('@Auth/loginFailure', ({ state, action }) => {
    const { message } = action.payload;
    state.loginStatus = 'failure';
    state.message = message;
  }),
  handleAction('@Auth/LogOut', ({ state }) => {
    state.renewToken = '';
    state.isLoggedIn = false;
  }),
  handleAction('@Auth/getShopname', ({ state, action }) => {
    const { shopName } = action.payload;
    state.shopName = shopName;
  }),
]);

export { reducerAuth };
