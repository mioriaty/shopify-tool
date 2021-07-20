import { css, Size } from 'wiloke-react-core';

interface StyleMapping {
  fontSize: number;
  paddingVertical: number;
  paddingHorizontal: number;
}

const getSizeStyleMapping = (borderWidth = 0): Record<Size, StyleMapping> => {
  return {
    'extra-small': {
      fontSize: 12,
      paddingHorizontal: 8 - borderWidth,
      paddingVertical: 15 - borderWidth,
    },
    small: {
      fontSize: 14,
      paddingHorizontal: 12 - borderWidth,
      paddingVertical: 18 - borderWidth,
    },
    medium: {
      fontSize: 15,
      paddingHorizontal: 13 - borderWidth,
      paddingVertical: 22 - borderWidth,
    },
    large: {
      fontSize: 15,
      paddingHorizontal: 14,
      paddingVertical: 17,
    },
  };
};

export const container = (size: Size, borderWidth?: number) => css`
  debug: Button-container;
  display: inline-block;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  appearance: none;
  line-height: 1.5;
  font-weight: 500;
  border: 0;
  transition: all 0.3s ease;
  font-size: ${getSizeStyleMapping(borderWidth)[size].fontSize}px;
  padding: ${getSizeStyleMapping(borderWidth)[size].paddingHorizontal}px ${getSizeStyleMapping(borderWidth)[size].paddingVertical}px;
`;

export const loading = css`
  debug: Button-loading;
  vertical-align: middle;
  margin-right: 8px;
  * {
    color: inherit !important;
  }
`;

export const text = css`
  debug: Button-text;
  vertical-align: middle;
`;

export const block = (block: boolean) => {
  if (!block) {
    return {};
  }
  return css`
    debug: Button-block;
    width: 100%;
  `;
};

export const disabled = (disabled: boolean) => {
  if (!disabled) {
    return {};
  }
  return css`
    debug: Button-disabled;
    opacity: 0.4;
    cursor: no-drop;
  `;
};

export const fontSize = (fontSize?: number) => {
  if (!fontSize) {
    return {};
  }
  return css`
    debug: Button-fontSize;
    font-size: ${fontSize}px;
  `;
};
