import configureApp from 'app/configureApp.json';
import { logOut, updateToken } from 'app/containers/Auth/actions/actionAuth';
import { store } from 'app/store/configureStore';
import qs from 'qs';
import { CANCEL } from 'redux-saga';
import ConfigureAxios from './ConfigureAxios';

interface RefreshTokenResponseData {
  data: {
    accessToken: string;
  };
}

interface AxiosData {
  refreshToken: string;
  accessToken: string;
}

const axiosConfig = new ConfigureAxios({
  configure: {
    method: 'GET',
    baseURL: configureApp.baseUrl,
    timeout: configureApp.timeout,
    paramsSerializer: qs.stringify,
  },
  setAccessToken() {
    return store ? store.getState().authPage.auth.loginToken : '';
  },
  setRefreshToken() {
    return store ? store.getState().authPage.auth.refreshToken : '';
  },
});

const fetchAPI = axiosConfig.create(CANCEL);

axiosConfig.accessToken({
  setCondition(config) {
    const isAppURL = config?.url?.search(/^http/g) === -1;
    return isAppURL;
  },
});

axiosConfig.refreshToken<RefreshTokenResponseData, AxiosData>({
  url: 'ebase/renew-token',
  setRefreshCondition(error) {
    return error.response?.status === 401 && !error.config.url?.includes('ebase/renew-token');
  },
  axiosData(refreshToken, accessToken) {
    return {
      refreshToken,
      accessToken,
    };
  },
  success(res, originalRequest) {
    store.dispatch(
      updateToken({
        accessToken: res.data.data.accessToken,
      }),
    );
    originalRequest.headers['X-ShopName'] = store ? store.getState().authPage.auth.shopName : '';
    originalRequest.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
  },
  failure(error) {
    console.log(error.response);
    store.dispatch(logOut());
  },
});

export default fetchAPI;
