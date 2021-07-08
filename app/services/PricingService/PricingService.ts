import { AxiosResponse } from 'axios';
import fetchAPI from 'app/utils/functions/fetchAPI';
import { ServerPlanResponse } from './types/server';

class PricingService {
  public async getPlan() {
    const response: AxiosResponse<ServerPlanResponse> = await fetchAPI.request({
      url: 'me/plans',
    });
    return response.data;
  }
}
export { PricingService };
