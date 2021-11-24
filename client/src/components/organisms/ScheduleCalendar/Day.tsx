import { useSetRecoilState } from 'recoil';
import { selectedNodeIdState } from 'recoil/node';
import { IMindNode } from 'types/mindmap';
import { getTodayDate, isSameDate } from 'utils/date';
import { DayTask, DayWrapper } from './style';

interface IProps {
  dayDate?: { year: number; month: number; date: number };
  tasks?: IMindNode[];
  setHoveredNode?: React.Dispatch<React.SetStateAction<IMindNode | null>>;
  blur?: boolean;
}

const Day: React.FC<IProps> = ({ dayDate, tasks = [], setHoveredNode = () => {}, blur }) => {
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState);

  if (!dayDate) {
    return <DayWrapper disable={true}></DayWrapper>;
  }

  const handleClickTask = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSelectedNodeId(id);
  };

  const handleHoverTask = (task: IMindNode) => setHoveredNode(task);
  const handleLeaveTask = () => setHoveredNode(null);

  const { date } = dayDate;
  const todayDate = getTodayDate();
  const today = new Date();

  return (
    <DayWrapper today={isSameDate(dayDate, todayDate)}>
      {date}
      {tasks.map((task) => {
        const dueAt = task.dueDate ? new Date(task.dueDate) : null;
        const endedAt = task.endDate ? new Date(task.endDate) : null;

        return (
          <DayTask
            key={task.nodeId}
            onClick={(e) => handleClickTask(e, task.nodeId)}
            onMouseEnter={() => handleHoverTask(task)}
            onMouseLeave={() => handleLeaveTask()}
            delayed={dueAt && !endedAt && today > dueAt}
            ended={dueAt && endedAt && true}
            blur={blur}
          >{`#${task.nodeId} ${task.content}`}</DayTask>
        );
      })}
    </DayWrapper>
  );
};

export default Day;
