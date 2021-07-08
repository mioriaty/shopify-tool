import { gql } from 'apollo-boost';
import { useLazyQuery } from 'react-apollo';

export interface ShopInterface {
  shop: {
    name: string;
    email: string;
  };
}

export const GET_SHOP_NAME = gql`
  query getShopName {
    shop {
      name
      email
    }
  }
`;

export const useGetShopName = () => {
  const [getShopName, { data, loading, error }] = useLazyQuery<ShopInterface, any>(GET_SHOP_NAME);
  return {
    data,
    loading,
    error,
    getShopName,
  };
};
