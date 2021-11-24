import { useEffect, useState } from 'react';
import { CalendarHeader, CalendarWrapper, LayerWrapper, Wrapper } from './style';
import { getTodayISODate, parseISODate } from 'utils/date';
import MonthSelector from './MonthSelector';
import Day from './Day';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { filteredTaskState } from 'recoil/project';
import { IMindNode } from 'types/mindmap';

import { selectedNodeIdState } from 'recoil/node';
import LayerDay from './LayerDay';
import LayerSprintMonth from './LayerSprintMonth';

const ScheduleCalendar = () => {
  const taskList = useRecoilValue(filteredTaskState);
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState);

  const [hoveredNode, setHoveredNode] = useState<IMindNode | null>(null);

  const [taskMapToDueDate, setTaskMapToDueDate] = useState<{ [ISODate: string]: IMindNode[] }>({});
  const [currentDateISO, setCurrentDateISO] = useState(getTodayISODate());
  const columns = ['일', '월', '화', '수', '목', '금', '토'];
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

  const handleClickOutside = () => setSelectedNodeId(null);

  return (
    <Wrapper onClick={() => handleClickOutside()}>
      <MonthSelector currentDateISO={currentDateISO} setCurrentDateISO={setCurrentDateISO} />
      <CalendarWrapper>
        {columns.map((column, idx) => (
          <CalendarHeader key={idx}>{column}</CalendarHeader>
        ))}
        {Array(prevDays)
          .fill(0)
          .map((_, idx) => (
            <Day key={idx} />
          ))}
        {Array(days)
          .fill(0)
          .map((_, idx) => (
            <Day
              key={idx}
              dayDate={{ year, month, date: idx + 1 }}
              tasks={taskMapToDueDate[`${year}-${month}-${idx + 1}`]}
              setHoveredNode={setHoveredNode}
              blur={hoveredNode ? true : false}
            />
          ))}
        {Array(nextDays)
          .fill(0)
          .map((_, idx) => (
            <Day key={idx} />
          ))}
      </CalendarWrapper>
      <LayerWrapper>
        {Array(prevDays)
          .fill(0)
          .map((_, idx) => (
            <LayerDay key={idx} />
          ))}
        {Array(days)
          .fill(0)
          .map((_, idx) => (
            <LayerDay key={idx} dayDate={{ year, month, date: idx + 1 }} task={hoveredNode} />
          ))}
        {Array(nextDays)
          .fill(0)
          .map((_, idx) => (
            <LayerDay key={idx} />
          ))}
      </LayerWrapper>
      <LayerWrapper className={hoveredNode ? 'blur' : ''}>
        <LayerSprintMonth currentDateISO={currentDateISO} />
      </LayerWrapper>
    </Wrapper>
  );
};

export default ScheduleCalendar;
