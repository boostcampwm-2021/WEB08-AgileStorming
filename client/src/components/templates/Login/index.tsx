import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Template, Wrapper } from './style';
import { BoxButton, Input, Title } from 'components/atoms';
import useModal from 'hooks/useModal';
import useToast from 'hooks/useToast';
import { authApi } from 'utils/api';
import { MODAL_TYPES } from '../GlobalModal';
import { logo } from 'img';

const Login = () => {
  const id = useRef<string>('');
  const history = useHistory();
  const { showModal } = useModal();
  const { showMessage, showError } = useToast();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => (id.current = e.target.value);
  const handleClickLogin = async (e: React.MouseEvent) => {
    if (id.current === '') {
      showMessage('아이디를 입력해주세요');
      return;
    }
    authApi
      .login(id.current)
      .then((res) => {
        if (res.status === 200) {
          showMessage('로그인 되었습니다.');
          history.push('/project');
        }
      })
      .catch((err) => (err.response?.data.msg ? showMessage(err.response?.data.msg) : showError(err)));
  };

  const handleClickRegister = (e: React.MouseEvent) => {
    showModal({ modalType: MODAL_TYPES.RegisterModal, modalProps: {} });
  };

  return (
    <Template>
      <Title titleStyle={'title'} color={'white'} margin={'0 0 0 auto'}>
        쉽게 쓰는 실시간 애자일 협업툴
      </Title>
      <Title titleStyle={'xxxlarge'} color={'white'} margin={'0 0 0 auto'}>
        마인드맵으로 동료들과 작업을 간편하게 관리할 수 있습니다.
      </Title>
      <Wrapper>
        <img src={logo} alt='AgileStorm' />
        <Input inputStyle='full' placeholder='아이디를 입력해주세요' onChange={handleIdChange} margin='0.5rem 0' spellCheck={false} />
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
