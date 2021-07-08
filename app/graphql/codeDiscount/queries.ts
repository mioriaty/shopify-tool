import { gql } from 'apollo-boost';
import { useLazyQuery, useSubscription } from 'react-apollo';

interface CodeDiscountEdge {
  cursor: string;
  node: {
    id: string;
    codeDiscount: {
      status: string;
      title: string;
      codeCount: string;
      summary: string;
      usageLimit: number | null;
      endsAt: string;
      startsAt: string;
    };
  };
}

export interface CodeDiscountsInterface {
  codeDiscountNodes: {
    edges: CodeDiscountEdge[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

interface CodeDiscountsVars {
  quantity?: number;
  cursor?: string;
}

export const GET_CODE_DISCOUNTS = gql`
  query getCodeDiscounts($quantity: Int!, $cursor: String) {
    codeDiscountNodes(first: $quantity, after: $cursor) {
      edges {
        cursor
        node {
          id
          codeDiscount {
            ... on DiscountCodeBasic {
              title
              status
              codeCount
              summary
              usageLimit
              endsAt
              startsAt
            }
            ... on DiscountCodeBxgy {
              title
              status
              codeCount
              summary
              usageLimit
              endsAt
              startsAt
            }
            ... on DiscountCodeFreeShipping {
              title
              status
              codeCount
              usageLimit
              summary
              endsAt
              startsAt
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

/*
totalSales {
  amount
  currencyCode
}
recurringCycleLimit
asyncUsageCount
hasTimelineComment
customerGets {
  appliesOnOneTimePurchase
  appliesOnSubscription
  items {
    ... on DiscountProducts {
      productVariants(first: 10) {
        edges {
          cursor
          node {
            id
            displayName
          }
        }
      }
    }
  }
*/

export const useGetCodeDiscounts = () => {
  const [getCodeDiscountsBasic, { data, loading, error }] = useLazyQuery<CodeDiscountsInterface, CodeDiscountsVars>(GET_CODE_DISCOUNTS);

  const handleGetCodeDiscountsBasic = ({ quantity = 100, cursor }: CodeDiscountsVars) => {
    return getCodeDiscountsBasic({ variables: { quantity, cursor } });
  };

  return {
    getCodeDiscountsBasic: handleGetCodeDiscountsBasic,
    data,
    loading,
    error,
  };
};

export const useCodeDiscountsSub = () => {
  const result = useSubscription<CodeDiscountsInterface>(GET_CODE_DISCOUNTS);
  return result;
};
