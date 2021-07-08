import React, { FC, ReactNode, useEffect, useState } from 'react';
import { ColorNames, Size } from 'wiloke-react-core';
import { Checkbox } from './Checkbox';
import { CheckboxGroupActionProvider, CheckboxGroupStateProvider } from './context';

export type CheckboxValueType = string;

export interface CheckboxOptionType {
  label?: ReactNode;
  value?: CheckboxValueType;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** name Checkbox */
  name?: string;
  /** Default values Checkbox */
  defaultValue?: CheckboxValueType[];
  /** options của Checkbox */
  options?: Array<CheckboxOptionType | string>;
  /** values của Checkbox */
  value?: CheckboxValueType[];
  /** children */
  children?: ReactNode;
  /** Kich thuoc Checkbox */
  size?: Size;
  /** disabled tat ca Checkbox */
  disabled?: boolean;
  /** Color khi Checkbox active */
  activeColor?: ColorNames;
  /** Màu border được lấy màu từ ThemeProvider */
  borderColor?: ColorNames;
  /** ref Checkbox */
  innerRef?: any;
  /** Color icon ben trong checkbox */
  iconActiveColor?: ColorNames;
  /** Sự kiện onChange Checkbox */
  onChange?: (checkedValue: CheckboxValueType[]) => void;
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  defaultValue,
  name,
  value,
  size = 'small',
  disabled = false,
  children,
  borderColor = 'gray5',
  options = [],
  activeColor = 'primary',
  iconActiveColor = 'light',
  innerRef,
  onChange,
}) => {
  const [valueState, setValueState] = useState<CheckboxValueType[]>(value || defaultValue || []);

  useEffect(() => {
    if (!!value) {
      setValueState(value || []);
    }
  }, [value]);

  const getOptions = () => {
    return options.map(option => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });
  };

  const _handleChange = (option: CheckboxOptionType) => {
    const optionIndex = valueState.indexOf(String(option.value));
    const newValue = [...valueState];

    if (optionIndex === -1) {
      newValue.push(String(option.value));
    } else {
      newValue.splice(optionIndex, 1);
    }

    if (!value) {
      setValueState(newValue);
    }

    onChange?.(newValue);
  };

  const _renderGroup = () => {
    let childrenToRender = children;
    if (options && options.length > 0) {
      childrenToRender = getOptions().map(option => {
        return (
          <Checkbox
            disabled={option.disabled ? option.disabled : disabled}
            checked={value?.indexOf(String(option.value)) !== -1}
            value={option.value}
            key={option.value?.toString()}
            innerRef={innerRef}
          >
            {option.label}
          </Checkbox>
        );
      });
    }
    return childrenToRender;
  };

  return (
    <CheckboxGroupStateProvider value={{ size, activeColor, borderColor, iconActiveColor, disabled, name, value: valueState }}>
      <CheckboxGroupActionProvider value={_handleChange}>{_renderGroup()}</CheckboxGroupActionProvider>
    </CheckboxGroupStateProvider>
  );
};

export { CheckboxGroup };
