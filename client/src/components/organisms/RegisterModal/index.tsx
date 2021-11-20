import React, { ChangeEvent, useRef } from 'react';
import { ModalBox, ModalOverlay, Input, Title } from 'components/atoms';
import { TextButton } from 'components/molecules';
import useModal from 'hooks/useModal';
import useToast from 'hooks/useToast';
import { AxiosError } from 'axios';
import { auth } from 'utils/api';

export interface IRegisterModalProps {
  key?: string;
}

interface INewUser {
  id: string;
  name: string;
}

const RegisterModal: React.FC<IRegisterModalProps> = () => {
  const newUser = useRef<INewUser>({ id: '', name: '' });
  const { hideModal } = useModal();
  const { showMessage, showError } = useToast();

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => (newUser.current.id = e.target.value);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => (newUser.current.name = e.target.value);
  const handleSubmit = async () => {
    if (newUser.current.id === '' || newUser.current.name === '') {
      showMessage('아이디와 이름을 입력해주세요');
      return;
    }
    try {
      const res = await auth.register(newUser.current.id, newUser.current.name);
      if (res.status === 200) {
        showMessage('가입되었습니다.');
        hideModal();
      }
    } catch (err) {
      showError(err as Error | AxiosError);
    }
  };
  return (
    <>
      <ModalOverlay visible={true} onClick={hideModal} />
      <ModalBox visible={true}>
        <Title titleStyle={'xlarge'}>회원가입</Title>
        <Title titleStyle={'large'} margin={'2rem 0 0 0.5rem'}>
          아이디
        </Title>
        <Input inputStyle={'large'} placeholder={'아이디를 입력해주세요'} margin={'1rem 0'} onChange={handleIdChange} />
        <Title titleStyle={'large'} margin={'1rem 0 0 0.5rem'}>
          이름
        </Title>
        <Input inputStyle={'large'} placeholder={'이름을 입력해주세요'} margin={'1rem 0'} onChange={handleNameChange} />
        <TextButton onClick={handleSubmit} text={'확인'} textColor={'red'} textWeight={'bold'} margin={'1rem 0 0 auto'} />
      </ModalBox>
    </>
  );
};

export default RegisterModal;
