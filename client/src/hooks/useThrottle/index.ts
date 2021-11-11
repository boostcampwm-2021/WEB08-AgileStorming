import { useRef } from 'react';

const useThrottle = (callback: (...params: any) => void, time: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...params: any) => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        callback(...params);
        timer.current = null;
      }, time);
    }
  };
};

export default useThrottle;
