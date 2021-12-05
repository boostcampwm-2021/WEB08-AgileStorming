import React, { ChangeEvent } from 'react';
import { ModalOverlay, Input, SmallText } from 'components/atoms';
import { PopupLayout, TextButton } from 'components/molecules';
import useKeys from 'hooks/useKeys';
import useModal from 'hooks/useModal';

export interface ITextInputModalProps {
  onClickSubmitButton?: () => void;
  onChangeInput?: (event: ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  text?: string;
  placeholder?: string;
}

const TextInputModal: React.FC<ITextInputModalProps> = ({
  onClickSubmitButton = () => {},
  onChangeInput = () => {},
  title,
  text,
  placeholder,
}) => {
  const { hideModal } = useModal();
  const { setOnEscKey, setOnEnterKey } = useKeys();

  setOnEnterKey(onClickSubmitButton);
  setOnEscKey(hideModal);

  return (
    <>
      <ModalOverlay visible={true} onClick={hideModal} />
      <PopupLayout title={title} popupStyle={'modal'} onClose={hideModal}>
        <SmallText color={'black'} weight={'normal'} margin={'1rem 0 0 0'}>
          {text}
        </SmallText>
        <Input placeholder={placeholder} margin={'20px 0'} onChange={onChangeInput} inputStyle={'gray'} />
        <TextButton onClick={onClickSubmitButton} text={'확인'} textColor={'red'} textWeight={'bold'} margin={'0 0 0 auto'} />
      </PopupLayout>
    </>
  );
};

export default TextInputModal;
