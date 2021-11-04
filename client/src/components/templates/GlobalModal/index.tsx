import React from 'react';
import { useRecoilState } from 'recoil';
import RegisterModal from 'components/organisms/RegisterModal';
import { modalState } from 'recoil/modal';

export enum MODAL_TYPES {
  RegisterModal = 'RegisterModal',
}

const MODAL_COMPONENTS = {
  [MODAL_TYPES.RegisterModal]: RegisterModal,
};

export const GlobalModal = () => {
  const { modalType, modalProps } = useRecoilState(modalState)[0] || {};
  const renderModal = () => {
    if (!modalType) {
      return null;
    }
    const ModalComponent = MODAL_COMPONENTS[modalType];
    return <ModalComponent {...modalProps} />;
  };
  return <>{renderModal()}</>;
};

export default GlobalModal;
