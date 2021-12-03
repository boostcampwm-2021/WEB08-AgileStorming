import { useRecoilState } from 'recoil';
import ConfirmModal from 'components/organisms/Modals/ConfirmModal';
import NewSprintModal from 'components/organisms/Modals/NewSprintModal';
import RegisterModal from 'components/organisms/Modals/RegisterModal';
import TextInputModal from 'components/organisms/Modals/TextInputModal';
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
