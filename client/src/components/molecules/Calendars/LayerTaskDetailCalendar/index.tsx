import { IMindNode } from 'types/mindmap';
import { LayerTaskDetailDay } from 'components/atoms';
import { parseISODate } from 'utils/date';

interface IProps {
  currentDateISO: string;
  hoveredNode: IMindNode | null;
}

const LayerTaskDetailMonth: React.FC<IProps> = ({ currentDateISO, hoveredNode }) => {
  const { year, month } = parseISODate(currentDateISO);
  const prevDays = new Date(year, month - 1, 1).getDay();
  const days = new Date(year, month, 0).getDate();
  const nextDays = 6 - new Date(year, month, 0).getDay();

  return (
    <>
      {Array(prevDays)
        .fill(0)
        .map((_, idx) => (
          <LayerTaskDetailDay key={idx} />
        ))}
      {Array(days)
        .fill(0)
        .map((_, idx) => (
          <LayerTaskDetailDay key={idx} dayDate={{ year, month, date: idx + 1 }} task={hoveredNode} />
        ))}
      {Array(nextDays)
        .fill(0)
        .map((_, idx) => (
          <LayerTaskDetailDay key={idx} />
        ))}
    </>
  );
};

export default LayerTaskDetailMonth;
