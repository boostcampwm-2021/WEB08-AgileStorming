import React, { ChangeEvent, useRef } from 'react';
import { ModalBox, ModalOverlay, Input, SmallText, Title } from 'components/atoms';
import { TextButton } from 'components/molecules';
import useModal from 'hooks/useModal';
import { common } from 'styles';

export interface IRegisterModalProps {}

interface INewUser {
  id: string;
  name: string;
}

const RegisterModal: React.FC<IRegisterModalProps> = () => {
  const { hideModal } = useModal();
  const newUser = useRef<INewUser>({ id: '', name: '' });

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => (newUser.current.id = e.target.value);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => (newUser.current.name = e.target.value);
  const handleSubmit = (e: React.MouseEvent) => {
    hideModal();
  };
  return (
    <>
      <ModalOverlay visible={true} onClick={hideModal} />
      <ModalBox visible={true}>
        <Title size={common.fontSize.xlarge}>회원가입</Title>
        <Title size={common.fontSize.large} margin={'2rem 0 0 0.5rem'}>
          아이디
        </Title>
        <Input placeholder={'아이디를 입력하세요'} margin={'1rem 0'} onChange={handleIdChange} />
        <Title size={common.fontSize.large} margin={'1rem 0 0 0.5rem'}>
          이름
        </Title>
        <Input placeholder={'이름을 입력하세요'} margin={'1rem 0'} onChange={handleNameChange} />
        <TextButton onClick={handleSubmit} text={'확인'} textColor={'red'} textWeight={'bold'} margin={'1rem 0 0 auto'} />
      </ModalBox>
    </>
  );
};

export default RegisterModal;
