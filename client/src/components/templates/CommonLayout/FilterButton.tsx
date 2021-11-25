import { BoxButton } from 'components/atoms';
import { filterIcon } from 'img';
import { useRecoilValue } from 'recoil';
import { assigneeFilterState, labelFilterState, labelListState, sprintFilterState, sprintListState, userListState } from 'recoil/project';

interface IProps {
  onClick: () => void;
}

const FilterButton: React.FC<IProps> = ({ onClick }) => {
  const assigneeFilter = useRecoilValue(assigneeFilterState);
  const sprintFilter = useRecoilValue(sprintFilterState);
  const labelFilter = useRecoilValue(labelFilterState);
  const sprintList = useRecoilValue(sprintListState);
  const userList = useRecoilValue(userListState);
  const labelList = useRecoilValue(labelListState);

  const isFiltered = sprintFilter || assigneeFilter || labelFilter;

  const filterTitle = isFiltered
    ? `필터링: ${sprintFilter ? sprintList[sprintFilter].name : ''} ${assigneeFilter ? userList[assigneeFilter].name : ''} ${
        labelFilter ? labelList[labelFilter].name : ''
      }`
    : '필터링';

  return (
    <BoxButton onClick={onClick} btnStyle={'normal'} margin='1rem 0 0 auto'>
      <img src={filterIcon} alt='필터링 버튼'></img>
      {filterTitle}
    </BoxButton>
  );
};

export default FilterButton;
