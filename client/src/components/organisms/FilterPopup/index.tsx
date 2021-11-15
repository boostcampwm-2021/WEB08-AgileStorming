import { useState } from 'react';
import { FilterMenuHeader, FilterItem } from './style';
import { useRecoilValue } from 'recoil';
import { PopupItemLayout, PopupLayout } from 'components/molecules';
import { queryUserListState } from 'recoil/user-list';
import { UserIcon } from 'components/atoms';

interface IProps {
  onClose: () => void;
}

const FilterPopup: React.FC<IProps> = ({ onClose }) => {
  const [displayedFilter, setDisplayedFilter] = useState('스프린트');
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null); // 추후에 recoil로
  const userList = useRecoilValue(queryUserListState);

  const handleFilterSelect = (filter: string) => setDisplayedFilter(filter);
  const handleSetAssigneeFilter = (assignee: string) => setAssigneeFilter(assignee);

  const isSelectedFilter = (filter: string) => (displayedFilter === filter ? 'selected' : '');

  const FilterMenu: React.FC<{ menu: string }> = ({ menu }) => (
    <span className={isSelectedFilter(menu)} onClick={() => handleFilterSelect(menu)}>
      {menu}
    </span>
  );

  console.log(userList);

  return (
    <PopupLayout title={`필터링: ${assigneeFilter ?? ''}`} onClose={onClose}>
      <FilterMenuHeader>
        <FilterMenu menu={'스프린트'} />
        <FilterMenu menu={'담당자'} />
        <FilterMenu menu={'라벨'} />
      </FilterMenuHeader>
      {displayedFilter === '스프린트' ? <PopupItemLayout>스프린트</PopupItemLayout> : ''}
      {displayedFilter === '담당자' && userList ? (
        <PopupItemLayout>
          {Object.values(userList).map((user) => {
            return (
              <FilterItem key={user.id} onClick={() => handleSetAssigneeFilter(user.id)}>
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
