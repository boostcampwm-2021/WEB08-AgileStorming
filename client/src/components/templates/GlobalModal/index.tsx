import { useRecoilState } from 'recoil';
import RegisterModal from 'components/organisms/RegisterModal';
import { modalState } from 'recoil/modal';

export enum ModalTypes {
  REGISTER_MODAL = 'RegisterModal',
}

const MODAL_COMPONENTS = {
  [ModalTypes.REGISTER_MODAL]: RegisterModal,
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
