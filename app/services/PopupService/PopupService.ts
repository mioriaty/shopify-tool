import { AxiosResponse } from 'axios';
import { Result } from 'app/models/PostMessageResult';
import fetchAPI from 'app/utils/functions/fetchAPI';
import { transformDate } from 'app/utils/functions/serviceHelpers';
import { ServerTableSubscriber } from '../SubscriberPageService';
import { CreatePopupData, ServerStatisticDetail, StatisticDetailModel } from './types/server';

class StatisticDetailService {
  public async getItems(page: number): Promise<Pick<ServerStatisticDetail, 'data'>> {
    const res: AxiosResponse<ServerStatisticDetail> = await fetchAPI.request({
      url: 'popups',
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
  }

  public async getItem(id: string) {
    const res: AxiosResponse<StatisticDetailModel> = await fetchAPI.request({
      url: `popups/${id}`,
    });
    return res.data;
  }

  public async addItem(config: Result, name: string) {
    const res: AxiosResponse<{ data: Pick<StatisticDetailModel, 'id'> }> = await fetchAPI.request({
      method: 'POST',
      url: 'popups',
      data: {
        config,
        title: name,
      } as CreatePopupData,
    });

    const today = new Date();
    const date = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();
    const newItem: StatisticDetailModel = {
      id: res.data.data.id,
      goal: config.goal,
      title: name,
      status: 'active',
      clicks: '0',
      conversion: '0',
      subscribers: '0',
      views: '0',
      date: date,
      config,
    };
    return newItem;
  }

  public async updateStatusItem(id: string, status: string) {
    await fetchAPI.request({
      method: 'PUT',
      url: `popups/${id}`,
      data: {
        status,
      },
    });
  }

  public async deleteItems(ids: string[]) {
    await fetchAPI.request({
      method: 'DELETE',
      url: 'popups',
      data: {
        ids: ids.join(','),
      },
    });
  }

  public async updateConfigItem(id: string, config: Result) {
    await fetchAPI.request({
      method: 'PUT',
      url: `popups/${id}`,
      data: {
        config,
      },
    });
  }

  public async getPopupTableData(id: string) {
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

      const newData = response.data.data.map((item, index) => {
        return {
          ...item,
          key: index + 1,
        };
      });
      return newData;
    } catch (error) {
      console.log(`http ${error}`);
    }
  }
}

export { StatisticDetailService };
