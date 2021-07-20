import { ClientStoreFrontPage } from 'app/services/AuthService';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionGetShopName, actionLogin, logOut, actionRenewToken, updateToken } from '../actions/actionAuth';
import { actionGetStoreFrontPages } from '../actions/actionPages';

type ReducerAuthAction = ActionTypes<
  typeof actionRenewToken | typeof logOut | typeof actionLogin | typeof actionGetShopName | typeof updateToken | typeof actionGetStoreFrontPages
>;

interface ReducerAuthInterface {
  loginToken: string;
  refreshToken: string;
  loginStatus: Status;
  message: string;
  isLoggedIn: boolean;
  shopName: string;
  pages: ClientStoreFrontPage[];
  pagesStatus: Status;
}

const initialState: ReducerAuthInterface = {
  loginToken: '',
  refreshToken: '',
  loginStatus: 'idle',
  message: '',
  isLoggedIn: false,
  pages: [],
  pagesStatus: 'loading',
  shopName: '',
};

const reducerAuth = createReducer<ReducerAuthInterface, ReducerAuthAction>(initialState, [
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
    state.loginToken = '';
    state.isLoggedIn = false;
  }),
  handleAction('@Auth/getShopname', ({ state, action }) => {
    const { shopName } = action.payload;
    state.shopName = shopName;
  }),
  handleAction('@Auth/renewRequest', ({ state }) => ({
    ...state,
  })),
  handleAction('@Auth/renewSuccess', ({ state, action }) => {
    const { accessToken } = action.payload;
    state.loginToken = accessToken;
  }),
  handleAction('@Auth/renewFailure', ({ state, action }) => {
    const { message } = action.payload;
    state.message = message;
  }),
  handleAction('@Auth/updateToken', ({ state, action }) => {
    const { accessToken } = action.payload;
    state.loginToken = accessToken;
    state.isLoggedIn = true;
  }),
  handleAction('@Auth/GetStoreFrontPagesRequest', ({ state }) => {
    state.pagesStatus = 'loading';
  }),
  handleAction('@Auth/GetStoreFrontPagesSuccess', ({ state, action }) => {
    const { pages } = action.payload;
    state.pagesStatus = 'success';
    state.pages = pages;
  }),
  handleAction('@Auth/GetStoreFrontPagesFailure', ({ state }) => {
    state.pagesStatus = 'failure';
  }),
]);

export { reducerAuth };
