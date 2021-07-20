import { isBrowser } from 'app/utils/isBrowser';
import { RefObject, useEffect } from 'react';

const useCLickInside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, callback: () => void) => {
  const _handleClick = (event: MouseEvent | TouchEvent) => {
    if (ref.current && ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    if (isBrowser) {
      document.addEventListener('click', _handleClick);
    }

    return () => {
      if (isBrowser) {
        document.removeEventListener('click', _handleClick);
      }
    };
  });
};

export default useCLickInside;
