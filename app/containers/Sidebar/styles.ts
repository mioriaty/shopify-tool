import { css } from 'wiloke-react-core';

export const container = (visible: boolean) => css`
  border-radius: 10px 0 0 10px;
  min-height: 750px;
  height: 100%;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    /* display: ${visible ? 'block' : 'none'}; */
    position: fixed;
    border-radius: 0;
    top: 0;
    left: 0;
    width: calc(100% - 50px);
    z-index: 10;
    transition: 0.2s ease-in;
    transform: translateX(${visible ? '0' : '-100%'});
  }
`;

export const bars = css`
  debug: Bars-toggle;
  display: none;
  border-radius: 50%;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 15px;
    right: 15px;
    z-index: 10;
  }
`;
