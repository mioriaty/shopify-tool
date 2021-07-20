import axios, { AxiosRequestConfig, AxiosInstance, AxiosError, AxiosResponse } from 'axios';

interface AxiosHeader {
  accessToken: string;
  'X-ShopName': string;
}

interface Configure {
  configure: AxiosRequestConfig;
  setAccessHeader: () => AxiosHeader;
  setRefreshToken: () => string;
}

type Success<ResponseDataT> = (res: AxiosResponse<ResponseDataT>, originalRequest: AxiosRequestConfig) => void;

type Failure = (error: AxiosError) => void;

interface AccessTokenParams {
  setCondition: (config: AxiosRequestConfig) => boolean;
}

interface Config<ResponseDataT, AxiosDataReturnT> {
  url: string;
  setRefreshCondition: (error: AxiosError) => boolean;
  axiosData: (refreshToken: string, accessToken: string) => AxiosDataReturnT;
  success: Success<ResponseDataT>;
  failure: Failure;
}

const { CancelToken } = axios;

export default class ConfigureAxios {
  private axiosInstance: AxiosInstance;
  private setAccessHeader: () => AxiosHeader;
  private setRefreshToken: () => string;
  private configs: AxiosRequestConfig[];
  private res: AxiosResponse | undefined;

  public constructor({ configure, setAccessHeader, setRefreshToken }: Configure) {
    this.setAccessHeader = setAccessHeader;
    this.setRefreshToken = setRefreshToken;
    this.axiosInstance = axios.create(configure);
    this.configs = [];
  }

  public create = (cancel = '') => {
    return {
      request: (requestConfig: AxiosRequestConfig) => {
        const source = CancelToken.source();
        const request = this.axiosInstance({ ...requestConfig, cancelToken: source.token });
        if (!!cancel) {
          // @ts-ignore
          request[cancel] = source.cancel;
        }
        return request;
      },
    };
  };

  public accessToken = ({ setCondition }: AccessTokenParams) => {
    this.axiosInstance.interceptors.request.use(config => {
      if (!config?.url) {
        return config;
      }
      const header = this.setAccessHeader();
      if (setCondition(config) && !config.headers.Authorization) {
        if (!!header.accessToken) {
          config.headers.Authorization = `Bearer ${header.accessToken}`;
          config.headers['X-ShopName'] = header['X-ShopName'];
        }
      }
      return config;
    });
  };

  private handleRefreshTokenAsync = async <ResponseDataT extends any, AxiosDataReturnT extends any>(
    config: Config<ResponseDataT, AxiosDataReturnT>,
    error: AxiosError,
  ) => {
    const { url, axiosData, success, failure } = config;
    try {
      const refreshToken = this.setRefreshToken();
      const headers = this.setAccessHeader();
      this.configs.push(error.config);

      if (this.configs.length === 1) {
        this.res = await this.axiosInstance.post(url, axiosData(refreshToken, headers.accessToken), {
          headers: { 'X-ShopName': headers['X-ShopName'] },
        });
      }

      success(this.res as AxiosResponse, error.config);
      await Promise.all(this.configs.map(this.axiosInstance.request));
      this.configs = [];
    } catch (err) {
      failure(error);
      await Promise.reject(error);
    } finally {
      this.refreshToken(config);
    }
  };

  public refreshToken = <ResponseDataT extends any = any, AxiosDataReturnT = any>(config: Config<ResponseDataT, AxiosDataReturnT>) => {
    const interceptor = this.axiosInstance.interceptors.response.use(undefined, (error: AxiosError) => {
      if (!config.setRefreshCondition(error)) {
        return Promise.reject(error);
      }
      console.log('refreshToken', error.response);
      this.axiosInstance.interceptors.response.eject(interceptor);
      return this.handleRefreshTokenAsync(config, error);
    });
  };
}
