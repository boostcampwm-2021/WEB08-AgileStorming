import { useRecoilState } from 'recoil';
import RegisterModal from 'components/organisms/Modal/RegisterModal';
import { ConfirmModal, NewSprintModal, TextInputModal } from 'components/organisms';
import { modalState } from 'recoil/modal';

export type TModal = 'confirmModal' | 'registerModal' | 'textInputModal' | 'newSprintModal';

const modalTypeToComponent = {
  confirmModal: ConfirmModal,
  registerModal: RegisterModal,
  textInputModal: TextInputModal,
  newSprintModal: NewSprintModal,
};

export const GlobalModal = () => {
  const { modalType, modalProps } = useRecoilState(modalState)[0] || {};
  const renderModal = () => {
    if (!modalType) {
      return null;
    }
    const ModalComponent = modalTypeToComponent[modalType];
    return <ModalComponent {...modalProps} />;
  };
  return <>{renderModal()}</>;
};

export default GlobalModal;
