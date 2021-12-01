import React, { useRef } from 'react';
import { ModalOverlay, Input, SmallText } from 'components/atoms';
import { PopupLayout, TextButton } from 'components/molecules';
import useModal from 'hooks/useModal';
import { TAddSprint } from 'types/event';
import useToast from 'hooks/useToast';
import { isHaveEmptyString, isISODate } from 'utils/form';
import { SplitDiv } from './style';
import useHistoryEmitter from 'hooks/useHistoryEmitter';
import useKeys from 'hooks/useKeys';

export interface INewSprintModalProps {
  noProps?: string;
}

const NewSprintModal: React.FC<INewSprintModalProps> = () => {
  const newSprint = useRef<TAddSprint>({ name: '', startDate: '', endDate: '' });
  const { addSprint } = useHistoryEmitter();
  const { hideModal } = useModal();
  const { setOnEnterKey, setOnEscKey } = useKeys();
  const { showMessage } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof TAddSprint) => (newSprint.current[key] = e.target.value);
  const handleSubmit = () => {
    if (isHaveEmptyString(Object.values(newSprint.current))) {
      showMessage('값을 모두 입력하세요.');
      return;
    }
    if (!isISODate(newSprint.current.startDate) || !isISODate(newSprint.current.endDate)) {
      showMessage('YYYY-MM-DD 형식으로 입력하세요.');
      return;
    }

    const { name, startDate, endDate } = newSprint.current;
    addSprint({ name, startDate, endDate });
    hideModal();
  };

  setOnEnterKey(handleSubmit);
  setOnEscKey(hideModal);

  return (
    <>
      <ModalOverlay visible={true} onClick={hideModal} />
      <PopupLayout title={'새 스프린트 생성'} popupStyle={'modal'} onClose={hideModal}>
        <SmallText color={'black'} margin={'1rem 0 0 0'}>
          새 스프린트 이름을 입력하세요.
        </SmallText>
        <Input placeholder={'새 스프린트 이름'} margin={'1rem 0'} onChange={(e) => handleInputChange(e, 'name')} inputStyle={'gray'} />
        <SmallText color={'black'}>시작 날짜와 종료날짜를 입력하세요.</SmallText>
        <SplitDiv>
          <Input placeholder={'YYYY-MM-DD'} margin={'1rem 0'} onChange={(e) => handleInputChange(e, 'startDate')} inputStyle={'gray'} />
          <Input placeholder={'YYYY-MM-DD'} margin={'1rem 0'} onChange={(e) => handleInputChange(e, 'endDate')} inputStyle={'gray'} />
        </SplitDiv>

        <TextButton onClick={handleSubmit} text={'생성'} textColor={'red'} textWeight={'bold'} margin={'0 0 0 auto'} />
      </PopupLayout>
    </>
  );
};

export default NewSprintModal;
