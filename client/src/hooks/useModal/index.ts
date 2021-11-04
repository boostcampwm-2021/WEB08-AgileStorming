import { useRecoilState } from 'recoil';
import { modalState, IModal } from 'recoil/modal';

const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const showModal = ({ modalType, modalProps }: IModal) => {
    setModal({ modalType, modalProps });
  };

  const hideModal = () => {
    setModal(null);
  };

  return {
    modal,
    setModal,
    showModal,
    hideModal,
  };
};

export default useModal;
