import React, { useRef } from 'react';
import { ModalOverlay, Input, SmallText } from 'components/atoms';
import { PopupLayout, TextButton } from 'components/molecules';
import useModal from 'hooks/useModal';
import { TAddSprint } from 'types/event';
import styled from '@emotion/styled';

export interface INewSprintModalProps {
  noProps?: string;
}

export const SplitDiv = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 47% auto;
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const NewSprintModal: React.FC<INewSprintModalProps> = () => {
  const newSprint = useRef<TAddSprint>({ name: '', startDate: '', endDate: '' });
  const { hideModal } = useModal();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => (newSprint.current.name = e.target.value);
  const handleSubmit = () => console.log(newSprint);
  return (
    <>
      <ModalOverlay visible={true} onClick={hideModal} />
      <PopupLayout title={'새 스프린트 생성'} popupStyle={'modal'} onClose={hideModal}>
        <SmallText color={'black'} margin={'1rem 0 0 0'}>
          새 스프린트 이름을 입력하세요.
        </SmallText>
        <Input placeholder={'새 스프린트 이름'} margin={'1rem 0'} onChange={handleNameChange} inputStyle={'gray'} />
        <SmallText color={'black'}>시작 날짜와 종료날짜를 입력하세요.</SmallText>
        <SplitDiv>
          <Input placeholder={'YY-MM-DD'} margin={'1rem 0'} onChange={handleNameChange} inputStyle={'gray'} />
          <Input placeholder={'YY-MM-DD'} margin={'1rem 0'} onChange={handleNameChange} inputStyle={'gray'} />
        </SplitDiv>

        <TextButton onClick={handleSubmit} text={'생성'} textColor={'red'} textWeight={'bold'} margin={'0 0 0 auto'} />
      </PopupLayout>
    </>
  );
};

export default NewSprintModal;
