import { Result } from 'app/models/PostMessageResult';
import fetchAPI from 'app/utils/functions/fetchAPI';
import handleError from 'app/utils/functions/handleError';
import { transformDate } from 'app/utils/functions/serviceHelpers';
import { sendLogError } from 'app/utils/functions/serviceHelpers/sendLogError';
import { AxiosResponse } from 'axios';
import { ServerTableSubscriber } from '../SubscriberPageService';
import { CreateSmartBarData, ServerSmartBarService, SmartBarServiceModel } from './types/server';

class SmartBarService {
  public async getItems(page: number) {
    try {
      const res: AxiosResponse<ServerSmartBarService> = await fetchAPI.request({
        url: 'smartbars',
        params: {
          limit: 50,
          page: page,
        },
      });
      const newItem = res.data.data.items.map(item => {
        return {
          ...item,
          date: transformDate(item.date),
        };
      });
      return {
        data: {
          items: newItem,
          maxPages: res.data.data.maxPages,
        },
      };
    } catch (error) {
      // handleError(error);
      sendLogError(`smartbars`, error);
    }
  }

  public async getItem(id: string) {
    try {
      const res: AxiosResponse<SmartBarServiceModel> = await fetchAPI.request({
        url: `smartbars/${id}`,
      });
      return res.data;
    } catch (error) {
      // handleError(error);
      sendLogError(`smartbars/${id}`, error);
    }
  }

  public async addItem(config: Result, name: string) {
    try {
      const res: AxiosResponse<{ data: Pick<SmartBarServiceModel, 'id'> }> = await fetchAPI.request({
        method: 'POST',
        url: 'smartbars',
        data: {
          config,
          title: name,
          status: 'deactive',
        } as CreateSmartBarData,
      });

      const today = new Date();
      const date = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();
      const newItem: SmartBarServiceModel = {
        id: res.data.data.id,
        goal: config.goal,
        title: name,
        status: 'deactive',
        clicks: '0',
        conversion: '0',
        subscribers: '0',
        views: '0',
        date: date,
        config,
      };
      return newItem;
    } catch (error) {
      handleError(error);
      sendLogError(`smartbars`, error);
    }
  }

  public async updateStatusItem(id: string, status: string) {
    try {
      await fetchAPI.request({
        method: 'PUT',
        url: `smartbars/${id}`,
        data: {
          status,
        },
      });
    } catch (error) {
      handleError(error);
      sendLogError(`smartbars/${id}`, error);
    }
  }

  public async deleteItems(ids: string[]) {
    try {
      await fetchAPI.request({
        method: 'DELETE',
        url: 'smartbars',
        data: {
          ids: ids.join(','),
        },
      });
    } catch (error) {
      handleError(error);
      sendLogError(`smartbars`, error);
    }
  }

  public async updateConfigItem(id: string, config: Result) {
    try {
      await fetchAPI.request({
        method: 'PUT',
        url: `smartbars/${id}`,
        data: {
          config,
          status: 'active',
        },
      });
    } catch (error) {
      handleError(error);
      sendLogError(`smartbars/${id}`, error);
    }
  }

  public async updateTitleItem(title: string, id: string) {
    try {
      await fetchAPI.request({
        method: 'PUT',
        url: `smartbars/${id}`,
        data: {
          title,
        },
      });
    } catch (error) {
      handleError(error);
      sendLogError(`smartbars/${id}`, error);
    }
  }

  public async getTableSmartBarData(id: string) {
    try {
      const response: AxiosResponse<ServerTableSubscriber> = await fetchAPI.request({
        url: `subscribers/${id}`,
        params: {
          limit: 40,
          page: 1,
        },
      });
      if (response.data.code !== 200) {
        return [];
      }
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
      handleError(error);
      sendLogError(`subscribers/${id}`, error);
    }
  }
}

export { SmartBarService };
