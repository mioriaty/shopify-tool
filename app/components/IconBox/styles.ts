import { css } from 'wiloke-react-core';

export type Size = 'small' | 'medium' | 'large';

const getSizeMapping = (...nums: number[]): Record<Size, number> => {
  return {
    small: nums[0],
    medium: nums[1],
    large: nums[2],
  };
};

export const container = (size: Size) => css`
  debug: IconBox-container;
  width: ${getSizeMapping(28, 39, 50)[size]}px;
  height: ${getSizeMapping(28, 39, 50)[size]}px;

  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
`;

export const backgroundColor = (color: string) => {
  if (!color) {
    return {};
  }
  return css`
    debug: Iconbox-backgroundColor;
    background-color: ${color};
  `;
};

export const overlay = css`
  debug: IconBox-overlay;
  background: linear-gradient(224.91deg, rgba(255, 255, 255, 0.454059) 1.84%, rgba(255, 255, 255, 0.146399) 52.09%, rgba(255, 255, 255, 0) 100%);

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
