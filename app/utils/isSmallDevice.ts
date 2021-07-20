import { isBrowser } from './isBrowser';

export const isSmallDevice = (): boolean => {
  return isBrowser && window.matchMedia('(max-width: 768px)').matches;
};
