import { atom } from 'recoil';
import { IRegisterModalProps } from 'components/organisms/RegisterModal';
import { ITextInputModalProps } from 'components/organisms/TextInputModal';
import { INewSprintModalProps } from 'components/organisms/NewSprintModal';
import { IConfirmModalProps } from 'components/organisms/ConfirmModal';

export interface IConfirmModal {
  modalType: 'confirmModal';
  modalProps: IConfirmModalProps;
}

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

export type IModal = IConfirmModal | IRegisterModal | ITextInputModal | INewSprintModal;

export const modalState = atom<IModal | null>({ key: 'modalState', default: null });
