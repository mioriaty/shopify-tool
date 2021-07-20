import { Result } from 'app/models/PostMessageResult';
import createState from 'app/utils/functions/createState';
import delay from 'app/utils/functions/delay';
import { v4 } from 'uuid';
import { ServerStatisticDetail, StatisticDetailModel } from './types/server';
import { data } from './data';

const statisticDetails = createState<ServerStatisticDetail>({
  status: 'success',
  data: {
    items: data,
    maxPages: 20,
  },
});
const defaultConfig: any = {
  goal: 'email',
  layout: {
    name: 'layout1',
    filters: {
      goals: ['email', 'email_wheel'],
    },
    data: [
      {
        id: '2b805e14-fdbc-4829-bb73-9594f5ddeeed',
        type: 'coupon_placeholder',
        enable: true,
        value: '',
        styles: {},
      },
      {
        id: '5106d622-bddc-428f-985c-6984b625c434',
        type: 'text',
        enable: true,
        value: 'Join Our Newsletter',
        styles: {
          fontFamily: 'Luckiest Guy',
          fontSize: '28px',
          color: 'rgba(255,0,0,1)',
        },
      },
      {
        id: 'c3390e3d-f08c-404b-8f2e-9ca06bb6482d',
        type: 'text',
        enable: true,
        value: 'Join our mailing list to stay up to date on our upcoming sales',
        styles: {
          fontFamily: 'Roboto',
          fontSize: '28px',
          color: '#000',
        },
      },
      {
        id: '766e7e68-b542-43cd-b638-89515c21a697',
        type: 'form',
        enable: true,
        variant: 'form-horizontal',
        value: {
          username: {
            id: '123',
            name: 'sdfs',
            label: 'Username',
            type: 'input-text',
            enable: false,
            value: '',
            styles: {
              fontFamily: 'Montserrat',
              fontSize: '20px',
              color: '#111111',
            },
          },
          email: {
            id: '123',
            name: 'sdfs',
            label: 'Email',
            type: 'input-text',
            enable: true,
            value: 'wiloke@email.com',
            styles: {
              fontFamily: 'Montserrat',
              fontSize: '20px',
              color: '#111111',
            },
          },
          button: {
            id: '123345435',
            name: 'dfgfdgfdg',
            label: 'Button',
            type: 'button',
            enable: true,
            value: 'Subscribe',
            styles: {
              fontFamily: 'Poppins',
              fontSize: '14px',
              color: '#333333',
            },
          },
        },
        styles: {},
      },
    ],
  },
  settings: {
    delay: 0,
    triggerUser: 'all',
    animate: 'none',
  },
  targeting: {
    showOnPage: ['home-page'],
    afterConversion: 30,
    afterClose: 3,
  },
  conversion: {
    title: 'Thanks for signing up!',
    redirectLink: '',
  },
  wheelSettings: {
    show: 'half',
    settings: [
      {
        id: '1',
        label: 'Free Shipping',
        winText: 'Thank you! You got an offer',
        coupon: 'COUPON_CODE',
        winRatio: 1,
        color: '#fff',
        backgroundColor: '#2AB885',
      },
      {
        id: '2',
        label: 'So sad',
        winText: 'Oops sorry!',
        coupon: '',
        winRatio: 1,
        color: '#fff',
        backgroundColor: '#0e5038',
      },
      {
        id: '3',
        label: 'Free Shipping',
        winText: 'Thank you! You got an offer',
        coupon: 'COUPON_CODE',
        winRatio: 1,
        color: '#fff',
        backgroundColor: '#2AB885',
      },
    ],
  },
};

export async function getStatisticDetails() {
  await delay(400);
  return statisticDetails.getState();
}

export async function getStatisticDetail(id: string): Promise<StatisticDetailModel> {
  await delay(400);
  return {
    ...(statisticDetails.getState().data.items.find(item => item.id === id) as StatisticDetailModel),
    config: defaultConfig,
  };
}

export async function setStatisticDetail(config: Result) {
  await delay(400);
  const today = new Date();
  const date = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();
  const newItem: StatisticDetailModel = {
    id: v4(),
    goal: config.goal,
    title: 'default name',
    status: 'active',
    clicks: '0',
    conversion: '0',
    subscribers: '0',
    views: '0',
    date: date,
    config,
  };
  statisticDetails.setState(listItem => ({
    ...listItem,
    data: {
      ...listItem.data,
      items: [...listItem.data.items, newItem],
    },
  }));

  return newItem;
}

export async function createDraftId() {
  await delay(400);
  return {
    id: v4(),
  };
}

export async function updateConfigItem(id: string, config: Result) {
  await delay(400);
  return statisticDetails.setState(prevState => {
    const updatedData = statisticDetails.getState().data.items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          config,
        };
      }
      return item;
    });
    return {
      ...prevState,
      data: {
        ...prevState.data,
        items: updatedData,
      },
    };
  });
}

export async function updateStatusItem(id: string) {
  await delay(400);
  return statisticDetails.setState(prevState => {
    const updatedData = statisticDetails.getState().data.items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status,
        };
      }
      return item;
    });
    return {
      ...prevState,
      data: {
        ...prevState.data,
        items: updatedData,
      },
    };
  });
}

export async function deleteItems(ids: string[]) {
  await delay(400);
  statisticDetails.setState(prevState => {
    return {
      ...prevState,
      data: {
        ...prevState.data,
        items: prevState.data.items.filter(item => !ids.includes(item.id)),
      },
    };
  });
}
