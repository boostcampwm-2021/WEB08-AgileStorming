import { isDeclareFunction, isReferenced } from '@babel/types';
import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastState } from 'recoil/toast';

interface IUseToast {
  showMessage: (message: string) => void;
  hideMessage: () => void;
}

const useToast = (): IUseToast => {
  const setToast = useSetRecoilState(toastState);
  const id = useRef(0);

  const showMessage = (message: string) => {
    setToast((toastList) => [...toastList, { id: id.current, show: true, message }]);
    const copyId = id.current;
    setTimeout(() => hideMessage(copyId), 2000);
    id.current = id.current + 1;
  };

  const hideMessage = (id: number) => {
    setToast((toastList) => {
      const newToastList = toastList.filter((e) => e.id !== id);
      const idx = toastList.findIndex((e) => e.id === id);
      setTimeout(() => deleteMessage(id), 200);
      return [...newToastList, { id, show: false, message: toastList[idx].message }];
    });
  };

  const deleteMessage = (id: number) => {
    setToast((toastList) => toastList.filter((e) => e.id !== id));
  };

  return {
    showMessage,
  } as IUseToast;
};

export default useToast;
