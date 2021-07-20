import { gql } from 'apollo-boost';
import { useEffect } from 'react';
import { useLazyQuery } from 'react-apollo';

export interface ShopInterface {
  shop: {
    name: string;
    email: string;
    myshopifyDomain: string;
  };
}

export const GET_SHOP_NAME = gql`
  query getShopName {
    shop {
      name
      email
      myshopifyDomain
    }
  }
`;

export const useGetShopName = () => {
  const [getShopName, { data, loading, error }] = useLazyQuery<ShopInterface, any>(GET_SHOP_NAME);

  // execute query on component mount
  useEffect(() => {
    getShopName();
  }, [getShopName]);

  return {
    data,
    loading,
    error,
    getShopName,
  };
};
