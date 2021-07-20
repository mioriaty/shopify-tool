import fetchAPI from 'app/utils/functions/fetchAPI';
import { transformDataDashboard } from 'app/utils/functions/serviceHelpers';
import { sendLogError } from 'app/utils/functions/serviceHelpers/sendLogError';
import { AxiosResponse } from 'axios';
import { getProductReviews, getProducts, getProductSale } from './fakeStatisticList';
import { ServerStatisticData } from './types/server';

class StatisticListService {
  // smartbar
  public async getStatisticList(params: any) {
    try {
      const response: AxiosResponse<ServerStatisticData> = await fetchAPI.request({
        url: 'insights/views',
        params: {
          postType: 'popup',
          ...params,
        },
      });
      return transformDataDashboard(response.data);
    } catch (error) {
      // handleError(error);
      sendLogError('insights/views', error);
    }
  }

  public async getPopupClicks(params: any) {
    try {
      const response: AxiosResponse<ServerStatisticData> = await fetchAPI.request({
        url: 'insights/clicks',
        params: {
          postType: 'popup',
          ...params,
        },
      });
      return transformDataDashboard(response.data);
    } catch (error) {
      // handleError(error);
      sendLogError('insights/clicks', error);
    }
  }

  public async getPopupSubscriber(params: any) {
    try {
      const response: AxiosResponse<ServerStatisticData> = await fetchAPI.request({
        url: 'insights/subscribers',
        params: {
          postType: 'popup',
          ...params,
        },
      });
      return transformDataDashboard(response.data);
    } catch (error) {
      // handleError(error);
      sendLogError('insights/subscribers', error);
    }
  }

  // products
  public async getProducts(_params: any) {
    const response = await getProducts();
    return transformDataDashboard(response);
  }

  public async getProductSale(_params: any) {
    const response = await getProductSale();
    return transformDataDashboard(response);
  }

  public async getProductReviews(_params: any) {
    const response = await getProductReviews();
    return transformDataDashboard(response);
  }

  // smart bar
  public async getSmartBar(params: any) {
    try {
      const response: AxiosResponse<ServerStatisticData> = await fetchAPI.request({
        url: 'insights/views',
        params: {
          postType: 'smartbar',
          ...params,
        },
      });
      return transformDataDashboard(response.data);
    } catch (error) {
      // handleError(error);
      sendLogError('insights/views', error);
    }
  }

  public async getSmartBarClicks(params: any) {
    try {
      const response: AxiosResponse<ServerStatisticData> = await fetchAPI.request({
        url: 'insights/clicks',
        params: {
          postType: 'smartbar',
          ...params,
        },
      });
      return transformDataDashboard(response.data);
    } catch (error) {
      // handleError(error);
      sendLogError('insights/clicks', error);
    }
  }

  public async getSmartBarSubscriber(params: any) {
    try {
      const response: AxiosResponse<ServerStatisticData> = await fetchAPI.request({
        url: 'insights/subscribers',
        params: {
          postType: 'smartbar',
          ...params,
        },
      });
      return transformDataDashboard(response.data);
    } catch (error) {
      // handleError(error);
      sendLogError('insights/subscribers', error);
    }
  }
}

export { StatisticListService };
