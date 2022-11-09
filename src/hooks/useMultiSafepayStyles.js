import { useEffect } from 'react';

const useCSS = (url) => {
  useEffect(() => {
    const link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [url]);
};

export default useCSS;
