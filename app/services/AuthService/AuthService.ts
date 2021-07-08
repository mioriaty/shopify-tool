import { AxiosResponse } from 'axios';
import fetchAPI from 'app/utils/functions/fetchAPI';
import { ServerTokenLogin } from './types/server';

interface GetTokenResponse {
  status: 'success' | 'failure';
  accessToken: string;
}

class AuthService {
  public async login(shopName: string, email: string, app: any) {
    const res: AxiosResponse<GetTokenResponse> = await fetchAPI.request({
      url: `${app.localOrigin}/api/token`,
    });

    const response: AxiosResponse<ServerTokenLogin> = await fetchAPI.request({
      url: 'ebase/shopify/login',
      method: 'POST',
      headers: {
        'X-ShopName': shopName,
      },
      data: { email, accessToken: res.data.accessToken },
    });
    return response.data.data;
  }

  public async renewToken(accessToken: string, refreshToken: string) {
    const response: AxiosResponse = await fetchAPI.request({
      url: 'ebase/renew-token',
      method: 'POST',
      data: {
        accessToken,
        refreshToken,
      },
    });

    return response.data;
  }
}

export { AuthService };
