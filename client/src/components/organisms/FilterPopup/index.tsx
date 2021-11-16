import { useState } from 'react';
import { FilterMenuHeader, FilterItem, SprintItem } from './style';
import { useRecoilValue } from 'recoil';
import { PopupItemLayout, PopupLayout } from 'components/molecules';
import { queryUserListState } from 'recoil/user-list';
import { UserIcon } from 'components/atoms';
import { sprintListState } from 'recoil/project';
import { ISOtoYYMMDD } from 'utils/form';

interface IProps {
  onClose: () => void;
}

const FilterPopup: React.FC<IProps> = ({ onClose }) => {
  const [displayedFilter, setDisplayedFilter] = useState('스프린트');
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null); // 추후에 recoil로
  const [sprintFilter, setSprintFilter] = useState<string | null>(null); // 추후에 recoil로

  const sprintList = useRecoilValue(sprintListState);
  const userList = useRecoilValue(queryUserListState);

  const isSelected = (target: string, selected: string | null) => (target === selected ? 'selected' : '');

  const handleFilterSelect = (filter: string) => setDisplayedFilter(filter);
  const handleSetSprintFilter = (sprint: string) => setSprintFilter(sprint === sprintFilter ? null : sprint);
  const handleSetAssigneeFilter = (assignee: string) => setAssigneeFilter(assignee === assigneeFilter ? null : assignee);

  const FilterMenu: React.FC<{ menu: string }> = ({ menu }) => (
    <span className={isSelected(menu, displayedFilter)} onClick={() => handleFilterSelect(menu)}>
      {menu}
    </span>
  );

  return (
    <PopupLayout title={`필터링: ${sprintFilter ?? ''} ${assigneeFilter ?? ''}`} onClose={onClose}>
      <FilterMenuHeader>
        <FilterMenu menu={'스프린트'} />
        <FilterMenu menu={'담당자'} />
        <FilterMenu menu={'라벨'} />
      </FilterMenuHeader>
      {displayedFilter === '스프린트' ? (
        <PopupItemLayout>
          {sprintList.map((sprint) => {
            return (
              <FilterItem
                key={sprint.id}
                className={isSelected(sprint.name, sprintFilter)}
                onClick={() => handleSetSprintFilter(sprint.name)}
              >
                <SprintItem>
                  <span>{sprint.name}</span>
                  <span>{`${ISOtoYYMMDD(sprint.startDate)}~${ISOtoYYMMDD(sprint.endDate)}`}</span>
                </SprintItem>
              </FilterItem>
            );
          })}
        </PopupItemLayout>
      ) : (
        ''
      )}
      {displayedFilter === '담당자' && userList ? (
        <PopupItemLayout>
          {Object.values(userList).map((user) => {
            return (
              <FilterItem key={user.id} className={isSelected(user.name, assigneeFilter)} onClick={() => handleSetAssigneeFilter(user.id)}>
                <UserIcon user={user} />
                {user.name}
              </FilterItem>
            );
          })}
        </PopupItemLayout>
      ) : (
        ''
      )}
      {displayedFilter === '라벨' ? <PopupItemLayout>라벨</PopupItemLayout> : ''}
    </PopupLayout>
  );
};

export default FilterPopup;
