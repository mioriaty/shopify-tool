import { notification } from 'antd';
import axios from 'axios';
import { useState } from 'react';

interface GetTokenResponse {
  status: 'success' | 'falure';
  accessToken: string;
}

export interface UseGetTokenState {
  token: string;
  status: 'success' | 'falure';
}

export const useGetToken = (app: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<UseGetTokenState | undefined>(undefined);

  const _handleGetToken = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get<GetTokenResponse>(`${app.localOrigin}/api/token`);
      setIsLoading(false);
      setData({
        token: res.data.accessToken,
        status: 'success',
      });
    } catch (err) {
      setIsLoading(false);
      setData({
        token: '',
        status: 'falure',
      });
      notification.error({
        message: 'Error AT',
      });
    }
  };

  return {
    isLoading,
    data,
    _handleGetToken,
  };
};
