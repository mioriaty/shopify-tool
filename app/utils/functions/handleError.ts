import { notification } from 'antd';
import { AxiosError } from 'axios';

interface ErrorData {
  code: number;
  message: string;
  status: string;
}

export default function handleError<T extends AxiosError<ErrorData> | Error>(error: T) {
  if ((error as AxiosError).isAxiosError) {
    const _error = error as AxiosError<ErrorData>;
    notification.error({
      duration: 2,
      message: 'You got an error',
      description: _error.response?.data.message,
    });
  } else {
    notification.error({
      message: 'You got an error',
      description: error.message,
    });
  }
}
