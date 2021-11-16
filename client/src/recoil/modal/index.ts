import { atom } from 'recoil';
import { IRegisterModalProps } from 'components/organisms/RegisterModal';
import { ITextInputModalProps } from 'components/organisms/TextInputModal';

export interface IRegisterModal {
  modalType: 'registerModal';
  modalProps: IRegisterModalProps;
}

export interface ITextInputModal {
  modalType: 'textInputModal';
  modalProps: ITextInputModalProps;
}

export type IModal = IRegisterModal | ITextInputModal;

export const modalState = atom<IModal | null>({ key: 'modalState', default: null });
