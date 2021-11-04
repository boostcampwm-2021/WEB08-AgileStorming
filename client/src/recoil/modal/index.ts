import { atom } from 'recoil';
import { MODAL_TYPES } from 'components/templates/GlobalModal';
import { IRegisterModalProps } from 'components/organisms/RegisterModal';

export interface IRegisterModal {
  modalType: typeof MODAL_TYPES.RegisterModal;
  modalProps: IRegisterModalProps;
}

export type IModal = IRegisterModal;

export const modalState = atom<IModal | null>({ key: 'modalState', default: null });
