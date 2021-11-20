import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastState } from 'recoil/toast';
import axios, { AxiosError } from 'axios';

const useToast = () => {
  const setToast = useSetRecoilState(toastState);
  const id = useRef(0);

  const showMessage = (message: string) => {
    setToast((toastList) => [...toastList, { id: id.current, show: true, message }]);
    const timerId = id.current;
    setTimeout(() => hideMessage(timerId), 2000);
    id.current = id.current + 1;
  };

  const showError = (err: Error | AxiosError) => {
    let message = '오류가 발생했습니다.';

    if (axios.isAxiosError(err) && err.response?.data?.msg) {
      message = err.response.data.msg;
    } else if (err.message) {
      message = err.message;
    }
    setToast((toastList) => [...toastList, { id: id.current, show: true, message }]);
    const timerId = id.current;
    setTimeout(() => hideMessage(timerId), 2000);
    id.current = id.current + 1;
  };

  const hideMessage = (tid: number) => {
    setToast((toastList) => {
      const newToastList = toastList.filter((e) => e.id !== tid);
      const idx = toastList.findIndex((e) => e.id === tid);
      setTimeout(() => deleteMessage(tid), 200);
      return [...newToastList, { id: tid, show: false, message: toastList[idx].message }];
    });
  };

  const deleteMessage = (tid: number) => {
    setToast((toastList) => toastList.filter((e) => e.id !== tid));
  };

  return {
    showMessage,
    showError,
  };
};

export default useToast;
