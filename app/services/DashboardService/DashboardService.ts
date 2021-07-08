import { AxiosResponse } from 'axios';
import fetchAPI from 'app/utils/functions/fetchAPI';
import { transformDataDashboard } from 'app/utils/functions/serviceHelpers';
import { getProductReviews, getProducts, getProductSale } from './fakeStatisticList';
import { ServerStatisticData } from './types/server';

class StatisticListService {
  // smartbar
  public async getStatisticList(params: any) {
    const response: AxiosResponse<ServerStatisticData> = await fetchAPI.request({
      url: 'insights/views',
      params: {
        postType: 'smartbar',
        ...params,
      },
    });
    return transformDataDashboard(response.data);
  }

  public async getPopupClicks(params: any) {
    const response: AxiosResponse<ServerStatisticData> = await fetchAPI.request({
      url: 'insights/clicks',
      params: {
        postType: 'smartbar',
        ...params,
      },
    });
    return transformDataDashboard(response.data);
  }

  public async getPopupSubscriber(params: any) {
    const response: AxiosResponse<ServerStatisticData> = await fetchAPI.request({
      url: 'insights/subscribers',
      params: {
        postType: 'smartbar',
        ...params,
      },
    });
    return transformDataDashboard(response.data);
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
    const response: AxiosResponse<ServerStatisticData> = await fetchAPI.request({
      url: 'insights/views',
      params: {
        postType: 'smartbar',
        ...params,
      },
    });
    return transformDataDashboard(response.data);
  }

  public async getSmartBarClicks(params: any) {
    const response: AxiosResponse<ServerStatisticData> = await fetchAPI.request({
      url: 'insights/clicks',
      params: {
        postType: 'smartbar',
        ...params,
      },
    });
    return transformDataDashboard(response.data);
  }

  public async getSmartBarSubscriber(params: any) {
    const response: AxiosResponse<ServerStatisticData> = await fetchAPI.request({
      url: 'insights/subscribers',
      params: {
        postType: 'smartbar',
        ...params,
      },
    });
    return transformDataDashboard(response.data);
  }
}

export { StatisticListService };
