import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { IToast, toastState } from 'recoil/toast';

interface IUseToast {
  showMessage: (message: string) => void;
  hideMessage: () => void;
}

const useToast = (): IUseToast => {
  const [toastObject, setToastObject] = useRecoilState(toastState);
  const latestToast = useRef(toastObject);

  useEffect(() => {
    latestToast.current = toastObject;
  }, [toastObject]);

  const showMessage = (message: string) => {
    setToastObject({ show: true, message } as IToast);
    setTimeout(hideMessage, 2000);
  };

  const hideMessage = () => {
    setToastObject({ show: false, message: latestToast.current.message });
  };

  return {
    showMessage,
    hideMessage,
  } as IUseToast;
};

export default useToast;
