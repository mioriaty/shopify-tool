import { css, nightModeBlacklist, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  position: relative;
  z-index: 999999;

  .CalendarDay__selected {
    background-color: ${colors.primary} !important;
    position: relative;
  }

  .CalendarDay__selected:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: ${nightModeBlacklist(colors.gray2)} !important;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
  }

  .CalendarDay__hovered_span {
    background: ${nightModeBlacklist(colors.gray2)} !important;
    border-radius: unset !important;
  }
  .CalendarDay__hovered_span:hover {
    background: ${nightModeBlacklist(colors.gray2)} !important;
  }

  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: ${colors.primary} !important;
    color: ${colors.light} !important;
    border: unset;
    border-radius: 50%;
  }

  .CalendarDay__default:hover {
    background: ${colors.primary} !important;
    color: ${colors.light} !important;
    border: unset;
    border-radius: 50%;
  }

  .CalendarDay__default {
    position: relative;
    border: unset;
    border-radius: 50%;
    color: ${colors.gray9};
    transition: 0.1s all ease;
  }

  .CalendarDay__selected_span {
    transition: 0.1s all ease;
    background: ${nightModeBlacklist(colors.gray2)};
    border-radius: unset !important;

    &:hover {
      border-radius: unset !important;
      background: ${colors.primary} !important;
      color: ${colors.light} !important;
    }
  }

  .CalendarMonth_table {
    tr {
      margin: 1px 0;
    }
  }

  .CalendarDay {
    padding: 0px !important;
  }

  .DayPicker__horizontal {
    width: 100% !important;
  }

  .DayPickerNavigation_button {
    border-radius: 6px;
    border: 1px solid ${colors.gray2};
  }
`;
