import React, { ChangeEvent, useRef } from 'react';
import { common } from 'styles';
import { Wrapper } from './style';
import { BoxButton } from 'components/atoms';
import { Input } from 'components/atoms';
import useModal from 'hooks/useModal';
import { MODAL_TYPES } from 'components/templates/GlobalModal';

const LoginBox = () => {
  const id = useRef<string>('');
  const { showModal } = useModal();

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => (id.current = e.target.value);

  const handleClickLogin = (e: React.MouseEvent) => {};

  const handleClickRegister = (e: React.MouseEvent) => {
    showModal({ modalType: MODAL_TYPES.RegisterModal, modalProps: {} });
  };

  return (
    <Wrapper>
      <Input placeholder='아이디를 입력해주세요' onChange={handleIdChange} spellCheck={false} />
      <BoxButton onClick={handleClickLogin} color={common.color.white} bgColor={common.color.primary2}>
        로그인
      </BoxButton>
      <BoxButton onClick={handleClickRegister} bgColor={common.color.primary3}>
        회원가입
      </BoxButton>
    </Wrapper>
  );
};

export default LoginBox;
