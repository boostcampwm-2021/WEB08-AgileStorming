import { useState } from 'react';
import { FilterMenuHeader } from './style';
import { PopupItemLayout, PopupLayout } from 'components/molecules';

interface IProps {
  onClose: () => void;
}

const FilterPopup: React.FC<IProps> = ({ onClose }) => {
  const [displayedFilter, setDisplayedFilter] = useState('스프린트');

  const handleFilterSelect = (filter: string) => setDisplayedFilter(filter);

  const isSelectedFilter = (filter: string) => (displayedFilter === filter ? 'selected' : '');

  const FilterMenu: React.FC<{ menu: string }> = ({ menu }) => {
    return (
      <span className={isSelectedFilter(menu)} onClick={() => handleFilterSelect(menu)}>
        {menu}
      </span>
    );
  };

  return (
    <PopupLayout title={`필터링:`} onClose={onClose}>
      <FilterMenuHeader>
        <FilterMenu menu={'스프린트'} />
        <FilterMenu menu={'담당자'} />
        <FilterMenu menu={'라벨'} />
      </FilterMenuHeader>
      {displayedFilter === '스프린트' ? <PopupItemLayout>스프린트</PopupItemLayout> : ''}
      {displayedFilter === '담당자' ? <PopupItemLayout>담당자</PopupItemLayout> : ''}
      {displayedFilter === '라벨' ? <PopupItemLayout>라벨</PopupItemLayout> : ''}
    </PopupLayout>
  );
};

export default FilterPopup;
