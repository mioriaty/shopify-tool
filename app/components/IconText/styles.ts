import { css, Theme } from 'wiloke-react-core';

export const container = (active: boolean) => ({ colors }: Theme) => css`
  padding: 20px;
  border: 2px solid ${active ? colors.primary : colors.gray2};
  cursor: pointer;
`;

export const icon = css`
  margin-bottom: 12px;
`;
