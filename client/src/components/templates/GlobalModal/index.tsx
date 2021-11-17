import { useRecoilState } from 'recoil';
import RegisterModal from 'components/organisms/RegisterModal';
import { NewSprintModal, TextInputModal } from 'components/organisms';
import { modalState } from 'recoil/modal';

export type TModal = 'registerModal' | 'textInputModal';

const modalTypeToComponent = {
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
