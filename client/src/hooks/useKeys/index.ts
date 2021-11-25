import { useEffect } from 'react';

const useKeys = () => {
  let onEnterKey = () => {};
  let onEscKey = () => {};

  const setOnEnterKey = (callback: () => void) => (onEnterKey = callback);
  const setOnEscKey = (callback: () => void) => (onEscKey = callback);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        onEnterKey();
        break;
      case 'Esc': //IE
        onEscKey();
        break;
      case 'Escape': //Chrome
        onEscKey();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return { setOnEnterKey, setOnEscKey };
};

export default useKeys;
