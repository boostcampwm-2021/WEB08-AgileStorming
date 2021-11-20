import React, { useRef, useState } from 'react';
import { FilterMenuHeader, FilterItem, SprintItem, FilterButton, FilterItemContainer } from './style';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PopupItemLayout, PopupLayout } from 'components/molecules';
import { ColorIcon, UserIcon } from 'components/atoms';
import { ISOtoYYMMDD } from 'utils/form';
import { assigneeFilterState, labelFilterState, labelListState, sprintFilterState, sprintListState, userListState } from 'recoil/project';
import { closeIcon, plus } from 'img';
import useModal from 'hooks/useModal';
import useHistoryEmitter from 'hooks/useHistoryEmitter';

interface IProps {
  onClose: () => void;
}

const FilterPopup: React.FC<IProps> = ({ onClose }) => {
  const [displayedFilter, setDisplayedFilter] = useState('스프린트');

  const [assigneeFilter, setAssigneeFilter] = useRecoilState(assigneeFilterState);
  const [sprintFilter, setSprintFilter] = useRecoilState(sprintFilterState);
  const [labelFilter, setLabelFilter] = useRecoilState(labelFilterState);
  const sprintList = useRecoilValue(sprintListState);
  const userList = useRecoilValue(userListState);
  const labelList = useRecoilValue(labelListState);

  const { showModal, hideModal } = useModal();
  const { addLabel, deleteSprint, deleteLabel } = useHistoryEmitter();

  const newLabelName = useRef<string>('');

  const isSelected = (target: number | string, selected: number | string | null) => (target === selected ? 'selected' : '');

  const requestDeleteSprint = () => {
    deleteSprint({ sprintId: sprintFilter! });
    setSprintFilter(null);
    hideModal();
  };

  const requestAddLabel = () => {
    if (!newLabelName.current) return;
    addLabel({ name: newLabelName.current });
    newLabelName.current = '';
    hideModal();
  };

  const requestDeleteLabel = () => {
    deleteLabel({ labelId: labelFilter! });
    setLabelFilter(null);
    hideModal();
  };

  const showDeleteSprintModal = () => {
    showModal({
      modalType: 'confirmModal',
      modalProps: {
        title: '스프린트 삭제',
        text: `'${sprintList[sprintFilter!].name}' 스프린트를 삭제합니다`,
        onClickSubmitButton: () => requestDeleteSprint(),
        onCancelButton: () => hideModal(),
      },
    });
  };

  const showAddLabelModal = () => {
    showModal({
      modalType: 'textInputModal',
      modalProps: {
        title: '새 라벨 생성',
        text: '새로운 라벨 이름을 입력해주세요.',
        placeholder: '라벨 이름',
        onChangeInput: (e) => handleChangeLabelInput(e, newLabelName),
        onClickSubmitButton: () => requestAddLabel(),
      },
    });
  };

  const showDeleteLabelModal = () => {
    showModal({
      modalType: 'confirmModal',
      modalProps: {
        title: '라벨 삭제',
        text: `'${labelList[labelFilter!].name}' 라벨을 삭제합니다.`,
        onClickSubmitButton: () => requestDeleteLabel(),
        onCancelButton: () => hideModal(),
      },
    });
  };

  const handleFilterSelect = (filter: string) => setDisplayedFilter(filter);
  const handleSetSprintFilter = (sprint: number) => setSprintFilter((prev) => (sprint === prev ? null : sprint));
  const handleSetAssigneeFilter = (assignee: string) => setAssigneeFilter((prev) => (assignee === prev ? null : assignee));
  const handleSetLabelFilter = (label: number) => setLabelFilter((prev) => (label === prev ? null : label));

  const handleClickAddSprint = () => showModal({ modalType: 'newSprintModal', modalProps: {} });
  const handleClickDeleteSprint = () => showDeleteSprintModal();
  const handleClickAddLabel = () => showAddLabelModal();
  const handleClickDeleteLabel = () => showDeleteLabelModal();

  const handleChangeLabelInput = (event: React.ChangeEvent<HTMLInputElement>, ref: React.MutableRefObject<string>) =>
    (ref.current = event.target.value);

  const FilterMenu: React.FC<{ menu: string }> = ({ menu }) => (
    <span className={isSelected(menu, displayedFilter)} onClick={() => handleFilterSelect(menu)}>
      {menu}
    </span>
  );

  const DeleteButton: React.FC<{ onClick: React.MouseEventHandler }> = ({ onClick }) => (
    <FilterButton onClick={onClick}>
      <img src={closeIcon} width={'16px'} height={'16px'} alt='삭제하기' />
    </FilterButton>
  );

  const AddButton: React.FC<{ onClick: React.MouseEventHandler }> = ({ onClick }) => (
    <FilterButton onClick={onClick}>
      <img src={plus} width={'16px'} height={'16px'} alt='추가하기' />
    </FilterButton>
  );

  const popupTitle = `필터링: ${sprintFilter ? sprintList[sprintFilter].name : ''} ${assigneeFilter ? userList[assigneeFilter].name : ''} ${
    labelFilter ? labelList[labelFilter].name : ''
  }`;

  return (
    <PopupLayout title={popupTitle} onClose={onClose}>
      <FilterMenuHeader>
        <FilterMenu menu={'스프린트'} />
        <FilterMenu menu={'담당자'} />
        <FilterMenu menu={'라벨'} />
      </FilterMenuHeader>
      {displayedFilter === '스프린트' ? (
        <PopupItemLayout>
          <FilterItemContainer>
            {Object.values(sprintList).map((sprint) => (
              <FilterItem key={sprint.id} className={isSelected(sprint.id, sprintFilter)} onClick={() => handleSetSprintFilter(sprint.id)}>
                <SprintItem>
                  <ColorIcon color={sprint.color} />
                  <span>{sprintList[sprint.id].name}</span>
                  <span>{`${ISOtoYYMMDD(sprint.startDate)}~${ISOtoYYMMDD(sprint.endDate)}`}</span>
                </SprintItem>
              </FilterItem>
            ))}
          </FilterItemContainer>
          {sprintFilter ? <DeleteButton onClick={handleClickDeleteSprint} /> : <AddButton onClick={handleClickAddSprint} />}
        </PopupItemLayout>
      ) : (
        ''
      )}
      {displayedFilter === '담당자' ? (
        <PopupItemLayout>
          <FilterItemContainer>
            {Object.values(userList).map((user) => (
              <FilterItem key={user.id} className={isSelected(user.id, assigneeFilter)} onClick={() => handleSetAssigneeFilter(user.id)}>
                <UserIcon user={user} />
                {userList[user.id].name}
              </FilterItem>
            ))}
          </FilterItemContainer>
        </PopupItemLayout>
      ) : (
        ''
      )}
      {displayedFilter === '라벨' ? (
        <PopupItemLayout>
          <FilterItemContainer>
            {Object.values(labelList).map((label) => (
              <FilterItem key={label.id} className={isSelected(label.id, labelFilter)} onClick={() => handleSetLabelFilter(label.id)}>
                <ColorIcon color={label.color} />
                {labelList[label.id].name}
              </FilterItem>
            ))}
          </FilterItemContainer>
          {labelFilter ? <DeleteButton onClick={handleClickDeleteLabel} /> : <AddButton onClick={handleClickAddLabel} />}
        </PopupItemLayout>
      ) : (
        ''
      )}
    </PopupLayout>
  );
};

export default FilterPopup;
