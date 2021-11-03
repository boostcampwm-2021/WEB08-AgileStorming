import React, { ChangeEvent } from 'react';
import { ModalBox, ModalOverlay, Input, SmallText } from 'components/atoms';
import { TextButton } from 'components/molecules';

interface IProps {
  onClickSubmitButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickOverlay: (event: React.MouseEvent<HTMLElement>) => void;
  onClickChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  text: string;
  placeholder: string;
  visible: boolean;
}

const TextInputModal: React.FC<IProps> = ({ onClickSubmitButton, onClickOverlay, onClickChangeInput, text, placeholder, visible }) => {
  return (
    <>
      <ModalOverlay visible={visible} onClick={onClickOverlay} />
      <ModalBox visible={visible}>
        <SmallText color={'black'} weight={'bold'}>
          {text}
        </SmallText>
        <Input placeholder={placeholder} margin={'20px 0'} onChange={onClickChangeInput} />
        <TextButton onClick={onClickSubmitButton} text={'확인'} textColor={'red'} textWeight={'bold'} margin={'0 0 0 auto'} />
      </ModalBox>
    </>
  );
};

export default TextInputModal;
