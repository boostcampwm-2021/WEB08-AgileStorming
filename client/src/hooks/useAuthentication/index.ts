import useToast from 'hooks/useToast';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isAuthenticatedState, userState } from 'recoil/user';
import { auth } from 'utils/api';

const useAuthentication = () => {
  const [isAuth, setIsAuth] = useRecoilState(isAuthenticatedState);
  const setUser = useSetRecoilState(userState);
  const history = useHistory();
  const { showMessage } = useToast();

  const redirectToLoginPage = () => history.push({ pathname: '/', state: { link: history.location.pathname } });

  const cleanAuthInfo = () => {
    setIsAuth(false);
    setUser(null);
  };

  const checkTokenStatus = async () => {
    try {
      const res = await auth.status();
      if (res.status === 200) {
        if (!isAuth) {
          const cacheUser = JSON.parse(localStorage.getItem('user')!);
          setIsAuth(true);
          setUser(cacheUser);
        }
      }
    } catch (err) {
      showMessage('로그인이 필요합니다.');
      cleanAuthInfo();
      redirectToLoginPage();
    }
  };

  useEffect(() => {
    checkTokenStatus();
    return () => cleanAuthInfo();
  }, []);
};

export default useAuthentication;
