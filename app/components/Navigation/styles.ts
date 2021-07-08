import { css } from 'wiloke-react-core';
import { RgbColors } from 'wiloke-react-core/dist/types/RgbColors';

export const container = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 10px;
`;

export const link = css`
  debug: Navigation-link;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  padding: 15px;
`;

export const parent = css`
  position: relative;
  display: block;
`;

export const active = (color: RgbColors) => css`
  background-color: rgba(${color.rgbLight}, 0.08);
  color: rgb(${color.rgbPrimary});
  border-radius: 10px;
`;
