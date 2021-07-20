import gql from 'graphql-tag';
import { useLazyQuery, useSubscription } from 'react-apollo';

interface AutomaticDiscountsEdge {
  cursor: string;
  node: {
    id: string;
    automaticDiscount: {
      status: string;
      title: string;
      summary: string;
    };
  };
}

export interface AutomaticDiscountsInterface {
  automaticDiscountNodes: {
    edges: AutomaticDiscountsEdge[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

interface AutomaticDiscountsVars {
  quantity?: number;
  cursor?: string;
}

export const GET_AUTOMATIC_DISCOUNTS = gql`
  query getAutomaticCodes($quantity: Int!, $cursor: String) {
    automaticDiscountNodes(first: $quantity, after: $cursor) {
      edges {
        node {
          id
          automaticDiscount {
            ... on DiscountAutomaticBasic {
              title
              summary
              status
            }
            ... on DiscountAutomaticBxgy {
              title
              summary
              status
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const useGetAutomaticDiscounts = () => {
  const [getAutomaticDiscounts, { data, loading, error }] = useLazyQuery<AutomaticDiscountsInterface, AutomaticDiscountsVars>(
    GET_AUTOMATIC_DISCOUNTS,
  );

  const handleGetAutoDiscountsBasic = ({ quantity = 100, cursor }: AutomaticDiscountsVars) => {
    return getAutomaticDiscounts({ variables: { quantity, cursor } });
  };

  return {
    getAutomaticDiscounts: handleGetAutoDiscountsBasic,
    data,
    loading,
    error,
  };
};

export const useAutomaticDiscountsSub = () => {
  const result = useSubscription<AutomaticDiscountsInterface>(GET_AUTOMATIC_DISCOUNTS);
  return result;
};
