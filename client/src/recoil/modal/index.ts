import { atom } from 'recoil';
import { IRegisterModalProps } from 'components/organisms/RegisterModal';
import { ITextInputModalProps } from 'components/organisms/TextInputModal';
import { INewSprintModalProps } from 'components/organisms/NewSprintModal';

export interface IRegisterModal {
  modalType: 'registerModal';
  modalProps: IRegisterModalProps;
}

export interface ITextInputModal {
  modalType: 'textInputModal';
  modalProps: ITextInputModalProps;
}

export interface INewSprintModal {
  modalType: 'newSprintModal';
  modalProps: INewSprintModalProps;
}

export type IModal = IRegisterModal | ITextInputModal | INewSprintModal;

export const modalState = atom<IModal | null>({ key: 'modalState', default: null });
