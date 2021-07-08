import { css } from 'wiloke-react-core';

export const dashboardContainer = css`
  @media screen and (max-width: 768px) {
    .dashboard__filter-container {
      width: 100%;
    }

    .dashboard__fitler--date,
    .dashboard__fitler--page {
      width: 100%;
      padding: 10px;
    }

    .dashboard__items {
      margin-bottom: 15px;
      width: 100%;
    }

    .dashboard__items:last-child {
      margin-bottom: 0;
    }
  }
`;
