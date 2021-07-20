import { v4 } from 'uuid';
import { StatisticDetailModel } from './types/server';

const today = new Date();
const date = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();
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

const goals = ['email', 'email_wheel', 'email_social', 'social_follows', 'target_url'];

const defaultData = {
  goal: 'email',
  status: 'active',
  clicks: '0',
  conversion: '0',
  subscribers: '0',
  views: '0',
  date: date,
  config: defaultConfig,
};

export const data = new Array(5).fill(undefined).map((_e, idx) => ({ ...defaultData, id: v4(), goal: goals[idx] })) as StatisticDetailModel[];
