import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  @media screen and (max-width: 768px) {
    .smartbar__delete-campaign {
      margin-top: 8px;
    }
    .smartbar__table-container::-webkit-scrollbar {
      height: 5px;
      width: 5px;
      border-radius: 10px;
    }
  }

  @media screen and (max-width: 1023px) {
    .smartbar__table-container {
      overflow-x: auto;
      max-width: 100%;
    }
    .smartbar__table-container::-webkit-scrollbar {
      height: 8px;
      width: 8px;
      border-radius: 10px;
    }

    .smartbar__table-container::-webkit-scrollbar-track {
      background: ${colors.gray2};
      box-shadow: none !important;
      outline: none !important;
    }

    .smartbar__table-container::-webkit-scrollbar-thumb {
      background: ${colors.gray4};
      box-shadow: none !important;
      outline: none !important;
      border-radius: 10px;
    }

    .smartbar__table-container::-webkit-scrollbar-thumb:hover {
      background: ${colors.gray6};

      outline: none !important;
      box-shadow: none !important;
    }
    .smartbar__table {
      min-width: 1000px;
    }
  }
`;

export const tableHeader = css`
  align-items: center;
  padding: 20px;

  @media screen and (max-width: 768px) {
    padding: 0 20px 10px;
    margin-bottom: 8px;
    flex-wrap: nowrap;
  }
`;

export const tabContainer = css`
  @media screen and (max-width: 768px) {
    .rc-tabs-tab {
      padding: 10px 16px;
    }
    .rc-tabs-nav-wrap {
      padding: 0;
    }
    .rc-tabs-nav {
      padding: 0;
    }
  }
`;
