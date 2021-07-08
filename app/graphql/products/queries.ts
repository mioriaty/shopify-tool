import gql from 'graphql-tag';
import { useLazyQuery, useSubscription } from 'react-apollo';

interface ProductsNode {
  cursor: string;
  node: {
    createdAt: any;
    description: any;
    title: any;
    id: any;
    featuredImage: {
      originalSrc: string;
    };
  };
}

export interface ProductsInterface {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: ProductsNode[];
  };
}

interface ProductsVars {
  quantity: number;
  cursor?: string;
}

export const GET_NEXT_PRODUCTS = gql`
  query($cursor: String) {
    products(first: 10, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                taxCode
                price
                id
                taxable
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($quantity: Int!, $cursor: String) {
    products(first: $quantity, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          createdAt
          description
          title
          featuredImage {
            originalSrc
          }
        }
      }
    }
  }
`;

export const useGetProducts = () => {
  const [getProducts, { data, loading, error, fetchMore }] = useLazyQuery<ProductsInterface, ProductsVars>(GET_PRODUCTS);

  const handleGetProducts = ({ quantity, cursor }: ProductsVars) => {
    return getProducts({ variables: { quantity, cursor } });
  };

  return {
    data,
    loading,
    error,
    getProducts: handleGetProducts,
    fetchMore,
  };
};

export const useProductsSub = () => {
  const result = useSubscription<ProductsInterface, ProductsVars>(GET_PRODUCTS);
  return result;
};
