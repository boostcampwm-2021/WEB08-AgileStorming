import React from 'react';
import { BottomButtonWrapper } from './style';
import { ModalOverlay, SmallText } from 'components/atoms';
import { PopupLayout, TextButton } from 'components/molecules';
import useKeys from 'hooks/useKeys';
import useModal from 'hooks/useModal';

export interface IConfirmModalProps {
  onClickSubmitButton?: () => void;
  onCancelButton?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  text?: string;
}

const ConfirmModal: React.FC<IConfirmModalProps> = ({ onClickSubmitButton = () => {}, onCancelButton = () => {}, title, text }) => {
  const { hideModal } = useModal();
  const { setOnEnterKey, setOnEscKey } = useKeys();

  setOnEnterKey(onClickSubmitButton);
  setOnEscKey(hideModal);

  return (
    <>
      <ModalOverlay visible={true} onClick={hideModal} />
      <PopupLayout title={title} popupStyle={'modal'} onClose={hideModal}>
        <SmallText color={'black'} weight={'normal'} margin={'2rem 0 2rem 0'}>
          {text}
        </SmallText>
        <BottomButtonWrapper>
          <TextButton onClick={onCancelButton} text={'취소'} textColor={'red'} textWeight={'bold'} margin={'0 auto 0 0'} />
          <TextButton onClick={onClickSubmitButton} text={'확인'} textColor={'black'} textWeight={'bold'} margin={'0 0 0 auto'} />
        </BottomButtonWrapper>
      </PopupLayout>
    </>
  );
};

export default ConfirmModal;
