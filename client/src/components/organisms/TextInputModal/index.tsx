import React from 'react';
import { ModalBox, ModalOverlay, Input } from 'components/atoms';
import { IconButton } from 'components/molecules';
import * as img from 'img';

interface IProps {
  onClickSubmitButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickOverlay: (event: React.MouseEvent<HTMLElement>) => void;
  text: string;
  placeholder: string;
  visible: boolean;
}

const TextInputModal: React.FC<IProps> = ({ onClickSubmitButton, onClickOverlay, text, placeholder, visible }) => {
  return (
    <>
      <ModalOverlay visible={visible} onClick={onClickOverlay} />
      <ModalBox visible={visible}>
        <p>{text}</p>
        <Input placeholder={placeholder} margin={'20px 0'} />
        <IconButton onClick={onClickSubmitButton} imgSrc={img.share} />
      </ModalBox>
    </>
  );
};

export default TextInputModal;
