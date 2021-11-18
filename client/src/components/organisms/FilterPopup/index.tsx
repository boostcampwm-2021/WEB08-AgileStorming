import { useRef, useState } from 'react';
import { FilterMenuHeader, FilterItem, SprintItem, FilterButton } from './style';
import { useRecoilValue } from 'recoil';
import { PopupItemLayout, PopupLayout } from 'components/molecules';
import { ColorIcon, UserIcon } from 'components/atoms';
import { ISOtoYYMMDD } from 'utils/form';
import { labelListState, sprintListState, userListState } from 'recoil/project';
import { plus } from 'img';
import useModal from 'hooks/useModal';
import useHistoryEmitter from 'hooks/useHistoryEmitter';

interface IProps {
  onClose: () => void;
}

const FilterPopup: React.FC<IProps> = ({ onClose }) => {
  const [displayedFilter, setDisplayedFilter] = useState('스프린트');
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null); // 추후에 recoil로
  const [sprintFilter, setSprintFilter] = useState<string | null>(null); // 추후에 recoil로
  const [labelFilter, setLabelFilter] = useState<string | null>(null); // 추후에 recoil로

  const sprintList = useRecoilValue(sprintListState);
  const userList = useRecoilValue(userListState);
  const labelList = useRecoilValue(labelListState);

  const { showModal, hideModal } = useModal();
  const { addLabel } = useHistoryEmitter();

  const newLabelName = useRef<string>('');

  const isSelected = (target: string, selected: string | null) => (target === selected ? 'selected' : '');

  const handleFilterSelect = (filter: string) => setDisplayedFilter(filter);
  const handleSetSprintFilter = (sprint: string) => setSprintFilter(sprint === sprintFilter ? null : sprint);
  const handleSetAssigneeFilter = (assignee: string) => setAssigneeFilter(assignee === assigneeFilter ? null : assignee);
  const handleSetLabelFilter = (label: string) => setLabelFilter(label === labelFilter ? null : label);

  const handleClickAddSprint = () => showModal({ modalType: 'newSprintModal', modalProps: {} });
  const handleChangeLabelInput = (event: React.ChangeEvent<HTMLInputElement>, ref: React.MutableRefObject<string>) =>
    (ref.current = event.target.value);
  const handleClickLabelSubmitEvent = () => {
    if (!newLabelName.current) return;
    addLabel({ name: newLabelName.current });
    newLabelName.current = '';
    hideModal();
  };
  const handleClickAddLabel = () => {
    showModal({
      modalType: 'textInputModal',
      modalProps: {
        title: '새 라벨 생성',
        text: '새로운 라벨 이름을 입력해주세요.',
        placeholder: '라벨 이름',
        onChangeInput: (e) => handleChangeLabelInput(e, newLabelName),
        onClickSubmitButton: handleClickLabelSubmitEvent,
      },
    });
  };

  const FilterMenu: React.FC<{ menu: string }> = ({ menu }) => (
    <span className={isSelected(menu, displayedFilter)} onClick={() => handleFilterSelect(menu)}>
      {menu}
    </span>
  );

  return (
    <PopupLayout title={`필터링: ${sprintFilter ?? ''} ${assigneeFilter ?? ''} ${labelFilter ?? ''}`} onClose={onClose}>
      <FilterMenuHeader>
        <FilterMenu menu={'스프린트'} />
        <FilterMenu menu={'담당자'} />
        <FilterMenu menu={'라벨'} />
      </FilterMenuHeader>
      {displayedFilter === '스프린트' ? (
        <PopupItemLayout>
          {Object.values(sprintList).map((sprint) => {
            return (
              <FilterItem
                key={sprint.id}
                className={isSelected(sprint.name, sprintFilter)}
                onClick={() => handleSetSprintFilter(sprint.name)}
              >
                <SprintItem>
                  <ColorIcon color={sprint.color} />
                  <span>{sprint.name}</span>
                  <span>{`${ISOtoYYMMDD(sprint.startDate)}~${ISOtoYYMMDD(sprint.endDate)}`}</span>
                </SprintItem>
              </FilterItem>
            );
          })}
          <FilterButton onClick={handleClickAddSprint}>
            <img src={plus} width={'16px'} height={'16px'} alt='추가하기' />
          </FilterButton>
        </PopupItemLayout>
      ) : (
        ''
      )}
      {displayedFilter === '담당자' ? (
        <PopupItemLayout>
          {Object.values(userList).map((user) => {
            return (
              <FilterItem
                key={user.id}
                className={isSelected(user.name, assigneeFilter)}
                onClick={() => handleSetAssigneeFilter(user.name)}
              >
                <UserIcon user={user} />
                {user.name}
              </FilterItem>
            );
          })}
        </PopupItemLayout>
      ) : (
        ''
      )}
      {displayedFilter === '라벨' ? (
        <PopupItemLayout>
          {Object.values(labelList).map((label) => {
            return (
              <FilterItem key={label.id} className={isSelected(label.name, labelFilter)} onClick={() => handleSetLabelFilter(label.name)}>
                <ColorIcon color={label.color} />
                {label.name}
              </FilterItem>
            );
          })}
          <FilterButton onClick={handleClickAddLabel}>
            <img src={plus} width={'16px'} height={'16px'} alt='추가하기' />
          </FilterButton>
        </PopupItemLayout>
      ) : (
        ''
      )}
    </PopupLayout>
  );
};

export default FilterPopup;
