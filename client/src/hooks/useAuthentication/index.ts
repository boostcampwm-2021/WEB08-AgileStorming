import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import useCustomHistory from 'hooks/useCustomHistory';
import useToast from 'hooks/useToast';
import { isAuthenticatedState, userState } from 'recoil/user';
import { auth } from 'utils/api';

const useAuthentication = () => {
  const setIsAuth = useSetRecoilState(isAuthenticatedState);
  const setUser = useSetRecoilState(userState);
  const { redirectLogin } = useCustomHistory();
  const { showMessage } = useToast();

  const cleanAuthInfo = () => {
    setIsAuth(false);
    setUser(null);
  };

  const checkTokenStatus = async () => {
    try {
      const res = await auth.status();
      if (res.status === 200) {
        const cacheUser = JSON.parse(localStorage.getItem('user')!);
        setIsAuth(true);
        setUser(cacheUser);
      }
    } catch (err) {
      showMessage('로그인이 필요합니다.');
      cleanAuthInfo();
      redirectLogin();
    }
  };

  useEffect(() => {
    checkTokenStatus();
    return () => cleanAuthInfo();
  }, []);
};

export default useAuthentication;
