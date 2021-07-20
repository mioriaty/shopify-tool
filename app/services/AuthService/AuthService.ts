import fetchAPI from 'app/utils/functions/fetchAPI';
import handleError from 'app/utils/functions/handleError';
import { sendLogError } from 'app/utils/functions/serviceHelpers/sendLogError';
import { AxiosResponse } from 'axios';
import { ClientStoreFrontPage } from './types/client';
import { ServerRenewToken, ServerStoreFrontPageResponse, ServerTokenLoginData } from './types/server';

class AuthService {
  public async login(shopName: string, email: string, app: any) {
    try {
      const res: AxiosResponse<ServerTokenLoginData> = await fetchAPI.request({
        method: 'POST',
        url: `${app.localOrigin}/api/token`,
        data: {
          email,
          shopName,
        },
      });

      return res.data;
    } catch (error) {
      handleError(error);
      sendLogError('ebase/shopify/login', error);
    }
  }

  public async renewToken(accessToken: string, refreshToken: string) {
    try {
      const response: AxiosResponse<ServerRenewToken> = await fetchAPI.request({
        url: 'ebase/renew-token',
        method: 'POST',
        data: {
          accessToken,
          refreshToken,
        },
      });
      return response.data.data;
    } catch (error) {
      handleError(error);
      sendLogError('ebase/renew-token', error);
    }
  }

  public async getStoreFrontPages(app: any, shopName: string) {
    try {
      const res: AxiosResponse<ServerStoreFrontPageResponse> = await fetchAPI.request({
        method: 'POST',
        url: `${app.localOrigin}/api/store-front-pages`,
        data: {
          shopName,
        },
      });

      const newResponse = res.data?.pages.map(item => {
        return {
          id: item.id,
          label: item.title,
          value: item.handle,
        };
      }) as ClientStoreFrontPage[];

      return newResponse || [];
    } catch (error) {
      handleError(error);
    }
  }
}

export { AuthService };
