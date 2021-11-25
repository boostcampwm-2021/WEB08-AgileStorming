import React, { useEffect, useState } from 'react';
import LayerScheduleDay from './LayerScheduleDay';
import { useRecoilValue } from 'recoil';
import { filteredTaskState } from 'recoil/project';
import { IMindNode } from 'types/mindmap';
import { parseISODate } from 'utils/date';

interface IProps {
  currentDateISO: string;
  setHoveredNode?: React.Dispatch<React.SetStateAction<IMindNode | null>>;
}

const LayerScheduleMonth: React.FC<IProps> = ({ currentDateISO, setHoveredNode }) => {
  const taskList = useRecoilValue(filteredTaskState);
  const [taskMapToDueDate, setTaskMapToDueDate] = useState<{ [ISODate: string]: IMindNode[] }>({});

  const { year, month } = parseISODate(currentDateISO);
  const prevDays = new Date(year, month - 1, 1).getDay();
  const days = new Date(year, month, 0).getDate();
  const nextDays = 6 - new Date(year, month, 0).getDay();

  useEffect(() => {
    const newTaskMapToDueDate: { [ISODate: string]: IMindNode[] } = {};
    Object.values(taskList).forEach((task) => {
      const { dueDate } = task;
      if (!dueDate) {
        return;
      }
      if (!newTaskMapToDueDate[dueDate]) {
        newTaskMapToDueDate[dueDate] = [];
      }
      newTaskMapToDueDate[dueDate].push(task);
    });
    setTaskMapToDueDate(newTaskMapToDueDate);
  }, [taskList]);

  return (
    <>
      {Array(prevDays)
        .fill(0)
        .map((_, idx) => (
          <LayerScheduleDay key={idx} />
        ))}
      {Array(days)
        .fill(0)
        .map((_, idx) => (
          <LayerScheduleDay
            key={idx}
            dayDate={{ year, month, date: idx + 1 }}
            tasks={taskMapToDueDate[`${year}-${month}-${idx + 1}`]}
            setHoveredNode={setHoveredNode}
          />
        ))}
      {Array(nextDays)
        .fill(0)
        .map((_, idx) => (
          <LayerScheduleDay key={idx} />
        ))}
    </>
  );
};

const LayerScheduleMonthMemo = React.memo(LayerScheduleMonth);

export default LayerScheduleMonthMemo;
