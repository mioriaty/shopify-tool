import fetchAPI from 'app/utils/functions/fetchAPI';
import handleError from 'app/utils/functions/handleError';
import { sendLogError } from 'app/utils/functions/serviceHelpers/sendLogError';
import { AxiosResponse } from 'axios';
import { ClientPlan } from './types/client';
import { ServerPlanResponse, ServerPlanUrlResponse } from './types/server';

class PricingService {
  public async getPlan() {
    try {
      const response: AxiosResponse<ServerPlanResponse> = await fetchAPI.request({
        url: 'me/plans',
      });
      return response.data;
    } catch (error) {
      // handleError(error);
      sendLogError(`me/plans`, error);
    }
  }

  public async getPlanUrl(plan: ClientPlan) {
    try {
      const response: AxiosResponse<ServerPlanUrlResponse> = await fetchAPI.request({
        method: 'POST',
        url: 'me/plans/charge/url',
        data: {
          planSlug: plan,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
      sendLogError(`me/plans/charge/url`, error);
    }
  }
}
export { PricingService };
