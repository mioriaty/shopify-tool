import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const updateToken = createAction('@Auth/updateToken', (payload: { accessToken: string }) => ({ ...payload }));
export const logOut = createAction('@Auth/LogOut');

export const actionLogin = createAsyncAction(['@Auth/loginRequest', '@Auth/loginSuccess', '@Auth/loginFailure'])<
  { shopName: string; email: string; app: any },
  { token: string; refreshToken: string },
  { message: string }
>();

export const useActionLogin = createDispatchAsyncAction(actionLogin);

export const actionRenewToken = createAsyncAction(['@Auth/renewRequest', '@Auth/renewSuccess', '@Auth/renewFailure'])<
  { accessToken: string; refreshToken: string },
  { accessToken: string },
  { message: string }
>();

export const useRenewToken = createDispatchAsyncAction(actionRenewToken);

export const actionGetShopName = createAction('@Auth/getShopname', (shopName: string) => ({ shopName }));
export const useActionGetShopName = createDispatchAction(actionGetShopName);
