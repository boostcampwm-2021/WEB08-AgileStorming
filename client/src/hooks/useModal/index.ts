import { useSetRecoilState } from 'recoil';
import { modalState, IModal } from 'recoil/modal';

const useModal = () => {
  const setModal = useSetRecoilState(modalState);

  const showModal = ({ modalType, modalProps }: IModal) => {
    setModal({ modalType, modalProps });
  };

  const hideModal = () => {
    setModal(null);
  };

  return {
    setModal,
    showModal,
    hideModal,
  };
};

export default useModal;
