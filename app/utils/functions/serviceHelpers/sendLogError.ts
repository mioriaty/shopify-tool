import configureApp from 'app/configureApp.json';
import { AxiosError } from 'axios';
import fetchAPI from '../fetchAPI';

interface ErrorData {
  code: number;
  message: string;
  status: string;
}

export async function sendLogError<T extends AxiosError<ErrorData> | Error>(endpoind: string, error: T) {
  if ((error as AxiosError).isAxiosError) {
    const _error = error as AxiosError<ErrorData>;
    await fetchAPI.request({
      method: 'POST',
      url: 'log/errors',
      data: {
        title: _error.response?.data.message,
        info: {
          endpoint: `${configureApp.baseUrl}${endpoind}`,
          message: _error.response?.data.message,
        },
        level: 'high',
        nonce: Math.floor(new Date().getTime() / 1000 / 7) * 7 + 10,
      },
    });
  } else {
    await fetchAPI.request({
      method: 'POST',
      url: 'log/errors',
      data: {
        title: error.message,
        info: {
          endpoint: `${configureApp.baseUrl}${endpoind}`,
          message: error.message,
        },
        level: 'high',
        nonce: Math.floor(new Date().getTime() / 1000 / 7) * 7 + 10,
      },
    });
  }
}
