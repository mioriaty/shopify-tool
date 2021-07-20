import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: Layout-container;
  padding: 20px;
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  max-width: 1400px;

  .page-content::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
  }

  .page-content::-webkit-scrollbar-track {
    background: ${colors.gray2};
    box-shadow: none !important;
    outline: none !important;
  }

  .page-content::-webkit-scrollbar-thumb {
    background: ${colors.gray5};
    box-shadow: none !important;
    outline: none !important;
    border-radius: 10px;
  }

  .page-content::-webkit-scrollbar-thumb:hover {
    background: ${colors.gray6};
    outline: none !important;
    box-shadow: none !important;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0;
  }
`;

export const content = css`
  debug: Layout-content;
  padding: 25px 20px;
  flex: 1;
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  max-height: 750px;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    max-height: auto;
    overflow-x: hidden;
    padding: 15px 15px 0;
  }
`;
