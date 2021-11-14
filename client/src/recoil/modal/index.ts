import { atom } from 'recoil';
import { ModalTypes } from 'components/templates/GlobalModal';
import { IRegisterModalProps } from 'components/organisms/RegisterModal';

export interface IRegisterModal {
  modalType: typeof ModalTypes.REGISTER_MODAL;
  modalProps: IRegisterModalProps;
}

export type IModal = IRegisterModal;

export const modalState = atom<IModal | null>({ key: 'modalState', default: null });
