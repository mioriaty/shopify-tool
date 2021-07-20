import { pmParent } from 'app/utils/constants/postmessage';
import { useEffect, useRef, useState } from 'react';

export const useIframeLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const pmEdit = useRef<() => void | undefined>();

  useEffect(() => {
    pmEdit.current = pmParent.on('@loaded', () => {
      setLoaded(true);
    });
    return () => {
      pmEdit.current?.();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const handleSetLoaded = (loaded: boolean) => {
    setLoaded(loaded);
  };

  return {
    loaded,
    setLoaded: handleSetLoaded,
  };
};
