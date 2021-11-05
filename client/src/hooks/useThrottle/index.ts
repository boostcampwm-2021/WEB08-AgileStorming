import { useRef } from 'react';

const useThrottle = (callback: (...params: any) => void, time: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return () => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        callback();
        timer.current = null;
      }, time);
    }
  };
};

export default useThrottle;
