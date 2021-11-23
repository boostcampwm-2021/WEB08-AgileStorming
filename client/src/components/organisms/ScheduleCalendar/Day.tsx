import { useSetRecoilState } from 'recoil';
import { selectedNodeIdState } from 'recoil/node';
import { IMindNode } from 'types/mindmap';
import { getTodayDate, isSameDate } from 'utils/date';
import { DayTask, DayWrapper } from './style';

interface IProps {
  dayDate?: { year: number; month: number; date: number };
  tasks?: IMindNode[];
}

const Day: React.FC<IProps> = ({ dayDate, tasks = [] }) => {
  const todayDate = getTodayDate();
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState);

  if (!dayDate) {
    return <DayWrapper disable={true}></DayWrapper>;
  }

  const handleClickTask = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSelectedNodeId(id);
  };

  const { year, month, date } = dayDate;
  return (
    <DayWrapper today={isSameDate(dayDate, todayDate)}>
      {date}
      {tasks.map(({ nodeId, content }) => (
        <DayTask key={nodeId} onClick={(e) => handleClickTask(e, nodeId)}>{`#${nodeId} ${content}`}</DayTask>
      ))}
    </DayWrapper>
  );
};

export default Day;
