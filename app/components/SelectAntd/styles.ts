import { css, Theme } from 'wiloke-react-core';

export const container = (colors: Theme['colors']) => css`
  debug: SelectAntd_container;
  position: relative;
  width: 100%;

  :global {
    .ant-select-selection-placeholder {
      padding: 0 5px !important;

      position: initial !important;
      transform: initial !important;
    }

    .ant-select-single .ant-select-selector .ant-select-selection-item,
    .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
      line-height: 35px !important;
    }

    .ant-select-arrow {
      position: absolute;
      color: ${colors.gray7} !important;
      right: 15px !important;
      /* top: 50%; */
      /* transform: translateY(-50%); */

      .anticon-search {
        font-size: 16px !important;
      }
      .anticon-down {
        transform: scaleX(1.3);
      }
    }
    .ant-select-selector {
      display: flex !important;
      flex-wrap: nowrap !important;
      align-items: center !important;
      overflow-x: auto !important;
      overflow-y: hidden !important;
      border-radius: 10px !important;
      border: 2px solid ${colors.gray3} !important;
      padding: 8px 15px !important;
      font-size: 14px !important  ;
      color: ${colors.gray7};
      outline: none !important;
      box-shadow: none !important;
      height: 100% !important;
    }
    .ant-select-selection-item {
      width: calc(100% - 30px) !important;
      height: 100% !important;
      padding: 0 !important;
      font-size: 14px;
      line-height: 21px;
      font-weight: 500;
      color: ${colors.gray7};
    }
    .ant-select-selection-search-input {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
    }

    .ant-select-selector span {
      flex: 0 0 auto;
    }
    .ant-select-selection-overflow-item {
      max-width: initial;
    }
    .ant-select-item {
      padding: 10px 15px !important;
    }
    .ant-select-dropdown {
      border-radius: 10px !important;
      background-color: ${colors.light};
      box-shadow: 0px 6px 12px rgba(23, 23, 79, 0.1);
      padding: 8px 0;
    }

    .ant-select-item.ant-select-item-option {
      color: ${colors.gray6} !important;
      background-color: ${colors.light} !important;
      font-weight: 500;
      line-height: 21px;
    }

    .ant-select-item.ant-select-item-option.ant-select-item-option-selected {
      background-color: ${colors.gray2} !important;
      color: ${colors.gray7} !important;
    }

    .ant-select-item-option-active {
      background-color: ${colors.gray1} !important;
    }
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      background-color: rgba(${colors.rgbPrimary}, 0.2) !important;
      font-weight: 500 !important;
    }
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
      height: 52px !important;
      background-color: ${colors.light} !important;
    }
    .ant-select-multiple .ant-select-selection-item {
      background-color: ${colors.gray1} !important;
      border: 1px solid ${colors.gray3} !important;
      padding: 4px 6px !important;
      border-radius: 6px !important;
    }
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) .ant-select-item-option-state {
      color: ${colors.primary};
    }
  }
`;

export const containerWithTag = css`
  debug: SelectAntd_containerWithTag;
  span.ant-select-selection-item {
    width: initial !important;
    height: initial !important;
  }
`;

export const optionMultipleLines = css`
  .ant-select-selection-item > div {
    display: block !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  .ant-select-selection-item > div > div {
    float: left !important;
  }

  :global {
    .ant-select-item-option-content {
      white-space: pre-wrap !important;
    }
  }
`;
