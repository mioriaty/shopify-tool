import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  /** Ẩn thanh dọc khi hover */
  line.apexcharts-active {
    display: none !important;
  }

  .apexcharts-tooltip.apexcharts-theme-light {
    transform: translate(20%, -50%);
  }

  .apexcharts-tooltip-title {
    background: ${colors.primary} !important;
    color: ${colors.light};
    font-weight: 600 !important;
    border: unset !important;
    font-size: 13px !important;
  }
  .apexcharts-tooltip {
    box-shadow: unset !important;
    border: 1px solid ${colors.gray2} !important;
  }
  .apexcharts-tooltip-marker {
    display: none;
  }
`;
