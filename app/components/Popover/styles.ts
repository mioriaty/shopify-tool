import { css } from 'wiloke-react-core';

export const container = css`
  :global {
    .ant-popover-inner {
      border-radius: 10px;
    }
    .ant-popover-arrow {
      display: none;
    }
    .ant-popover-inner-content {
      padding: 8px 0;
    }
    .ant-popover {
      min-width: 170px;
    }
    .ant-popover-placement-bottom,
    .ant-popover-placement-bottomLeft,
    .ant-popover-placement-bottomRight {
      padding-top: 0;
    }
  }
`;
