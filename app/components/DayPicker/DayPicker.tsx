import moment from 'moment';
import React, { FC, useState } from 'react';
import { DayPickerRangeController, DayPickerRangeControllerShape, FocusedInputShape } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { View } from 'wiloke-react-core';
import * as css from './styles';

export type DateType = moment.Moment | null;

type PickType = Pick<
  DayPickerRangeControllerShape,
  | 'startDate'
  | 'endDate'
  | 'withPortal'
  | 'orientation'
  | 'showKeyboardShortcuts'
  | 'hideKeyboardShortcutsPanel'
  | 'noBorder'
  | 'numberOfMonths'
  | 'keepOpenOnDateSelect'
  | 'renderCalendarInfo'
>;

export interface DayPickerProps extends PickType {
  onValueChange?: (arg: { startDate: DateType; endDate: DateType }) => void;
  onInputFocus?: (focusedInput: FocusedInputShape | null) => void;
  onChangeEnd?: () => void;
}

const DayPicker: FC<DayPickerProps> = ({
  endDate,
  startDate,
  onValueChange,
  onInputFocus,
  onChangeEnd,
  noBorder = true,
  showKeyboardShortcuts = false,
  hideKeyboardShortcutsPanel = true,
  numberOfMonths = 2,
  ...rest
}) => {
  const [focusedInputState, setFocusedInputState] = useState<FocusedInputShape | null>('startDate');

  const handleFocus = (focusedInput: FocusedInputShape | null) => {
    setFocusedInputState(!focusedInput ? 'startDate' : focusedInput);
    onInputFocus?.(focusedInput);
  };

  const handleDatesChange = (arg: { startDate: DateType; endDate: DateType }) => {
    onValueChange?.(arg);
    if (!!arg.startDate && !!arg.endDate) {
      onChangeEnd?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <View css={css.container}>
      <DayPickerRangeController
        {...rest}
        renderDayContents={day => (
          <View className="custom-day" css={{ fontWeight: 500, fontSize: '13px' }}>
            {day.format('D')}
          </View>
        )}
        noBorder={noBorder}
        showKeyboardShortcuts={showKeyboardShortcuts}
        hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
        numberOfMonths={numberOfMonths}
        focusedInput={focusedInputState}
        startDate={startDate}
        endDate={endDate}
        onDatesChange={handleDatesChange}
        onFocusChange={handleFocus}
        initialVisibleMonth={() => moment()}
      />
    </View>
  );
};

export { DayPicker };
