import { css, Size, Theme } from 'wiloke-react-core';

const controlSizeMapping: Record<Size, number> = {
  large: 36,
  medium: 30,
  small: 24,
  'extra-small': 18,
};

export const container = (disabled: boolean, size: Size) => css`
  font-size: ${size === 'extra-small' ? 12 : 14}px;
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  opacity: ${disabled ? 0.4 : 1};
  user-select: none;
  display: flex;
  align-items: center;
`;

export const control = (size: Size) => css`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  width: ${controlSizeMapping[size]}px;
  height: ${controlSizeMapping[size]}px;
`;

export const icon = css`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const bgIcon = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const children = ({ colors }: Theme) => css`
  margin-left: 5px;
  color: ${colors.gray7};
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
`;

export const innerWrap = css`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;

  input {
    cursor: pointer;
  }
`;

export const input = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  opacity: 0;
`;
