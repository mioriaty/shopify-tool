import { css, Theme } from 'wiloke-react-core';

export const tableContainer = css`
  debug: Pricing-table-container;
  width: 100%;
  vertical-align: middle;
  caption-side: bottom;
  border-collapse: collapse;

  font-weight: 1.25;

  tbody,
  td,
  tfoot,
  th,
  thead,
  tr {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
  }

  & > :not(caption) > * {
    border-width: 1px 0;
  }

  & > :not(caption) > * > * {
    border-width: 0 1px;
  }

  & > :not(caption) > * > * {
    border-bottom-width: 1px;
    border-right-width: 1px;
  }

  @media screen and (max-width: 1023px) {
    min-width: 1000px;
  }
`;

export const pricingContainer = ({ colors }: Theme) => css`
  @media screen and (max-width: 1023px) {
    overflow-x: auto;
    max-width: 100%;

    &::-webkit-scrollbar {
      height: 8px;
      width: 8px;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: ${colors.gray2};
      box-shadow: none !important;
      outline: none !important;
    }

    &::-webkit-scrollbar-thumb {
      background: ${colors.gray4};
      box-shadow: none !important;
      outline: none !important;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${colors.gray6};

      outline: none !important;
      box-shadow: none !important;
    }
  }
`;

export const tableHeader = css`
  debug: Pricing-table-header;
  vertical-align: bottom;

  th {
    padding: 20px 12px 19px;
  }
`;

export const tableBody = css`
  debug: Pricing-table-body;
  text-align: center;
  vertical-align: inherit;

  tr th {
    text-align: left;
  }

  th,
  td {
    padding: 12px;
  }
`;

export const col20 = css`
  width: 20%;
`;

export const normalFont = css`
  font-weight: normal;
  margin: 4px 0px 8px;
  line-height: 1.25;
`;
