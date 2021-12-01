import React, { useRef } from 'react';
import { Template, Wrapper } from './style';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { useSetRecoilState } from 'recoil';
import useModal from 'hooks/useModal';
import useToast from 'hooks/useToast';
import { isAuthenticatedState, userState } from 'recoil/user';
import { BoxButton, Input, Title } from 'components/atoms';
import { IUser } from 'types/user';
import { auth } from 'utils/api';
import { logoMovePrimary } from 'img';
import useCustomHistory from 'hooks/useCustomHistory';

interface IHistoryProps {
  redirectPage: string;
  projectId: string;
}

const Login = () => {
  const setIsAuth = useSetRecoilState(isAuthenticatedState);
  const setUser = useSetRecoilState(userState);
  const id = useRef<string>('');
  const history: History<IHistoryProps> = useHistory();
  const { historyPush } = useCustomHistory();
  const { showModal } = useModal();
  const { showMessage, showError } = useToast();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => (id.current = e.target.value);
  const handleClickLogin = async () => {
    if (id.current === '') {
      showMessage('아이디를 입력해주세요');
      return;
    }
    try {
      const res = await auth.login(id.current);
      if (res.status === 200) {
        const user = res.data as IUser;
        setIsAuth(true);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        showMessage('로그인 되었습니다.');
        const redirectPage = history.location.state?.redirectPage;
        if (redirectPage) historyPush(redirectPage, history.location.state?.projectId);
        else historyPush('project');
      }
    } catch (err) {
      showError(err as Error | AxiosError);
    }
  };

  const handleClickRegister = () => showModal({ modalType: 'registerModal', modalProps: {} });

  return (
    <Template>
      <Title titleStyle={'title'} color={'white'} margin={'0 0 0 auto'}>
        쉽게 쓰는 실시간 애자일 협업툴
      </Title>
      <Title titleStyle={'xxxlarge'} color={'white'} margin={'0 0 0 auto'}>
        마인드맵으로 동료들과 작업을 간편하게 관리할 수 있습니다.
      </Title>
      <Wrapper>
        <img src={logoMovePrimary} width={'350px'} alt='AgileStorm' />
        <Input
          inputStyle='full'
          placeholder='아이디를 입력해주세요'
          onChange={handleIdChange}
          margin='1.5rem 0 0.5rem 0'
          spellCheck={false}
        />
        <BoxButton onClick={handleClickLogin} btnStyle={'full'} color={'primary2'} margin={'0.3rem 0'}>
          로그인
        </BoxButton>
        <BoxButton onClick={handleClickRegister} btnStyle={'full'} color={'primary3'} margin={'0.3rem 0'}>
          회원가입
        </BoxButton>
      </Wrapper>
    </Template>
  );
};

export default Login;
