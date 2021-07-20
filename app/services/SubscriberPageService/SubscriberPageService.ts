import fetchAPI from 'app/utils/functions/fetchAPI';
import { sendLogError } from 'app/utils/functions/serviceHelpers/sendLogError';
import { AxiosResponse } from 'axios';
import { createSubscriber, deleteManySubscriber, deleteOneSubscriber, getSubscriber } from './fakeData';
import { ServerTableSubscriber } from './types/server';

class SubscriberPageService {
  public async getTableSubscriber() {
    try {
      const response: AxiosResponse<ServerTableSubscriber> = await fetchAPI.request({
        url: 'subscribers',
      });
      const newData = response.data.data.items.map((item, index) => {
        const today = new Date(Number(item.createdDate) * 1000);
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        return {
          ...item,
          key: index + 1,
          id: index + 1,
          createdDate: date,
        };
      });
      return newData;
    } catch (error) {
      // handleError(error);
      sendLogError(`subscribers`, error);
    }
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
