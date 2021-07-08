import { AxiosResponse } from 'axios';
import { SHOP_NAME } from 'app/types/requestParams';
import fetchAPI from 'app/utils/functions/fetchAPI';
import { createSubscriber, deleteManySubscriber, deleteOneSubscriber, getSubscriber } from './fakeData';
import { ServerTableSubscriber } from './types/server';

class SubscriberPageService {
  public async getTableSubscriber() {
    // const response: ServerTableSubscriber = await getTableData();
    const response: AxiosResponse<ServerTableSubscriber> = await fetchAPI.request({
      url: 'subscribers',
      params: {
        shopName: SHOP_NAME,
      },
    });
    const newData = response.data.data.map((item, index) => {
      return {
        ...item,
        key: index + 1,
      };
    });
    return newData;
  }

  public async createSubsciber(email: string) {
    const subscriber = await createSubscriber(email);
    return subscriber;
  }

  public async deleteManySubscriber(ids: string[]) {
    await deleteManySubscriber(ids);
  }

  public async deleteOneSubscriber(id: string) {
    await deleteOneSubscriber(id);
  }

  public async getSubscriber(id: string) {
    const response = await getSubscriber(id);
    return response;
  }
}

export { SubscriberPageService };
