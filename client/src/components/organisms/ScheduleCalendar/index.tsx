import { useState } from 'react';
import { CalendarWrapper, LayerWrapper, Wrapper } from './style';
import MonthSelector from './MonthSelector';
import Calendar from './Calendar';
import LayerSprintMonth from './LayerSprintMonth';
import LayerTaskDetailMonth from './LayerTaskDetailMonth';
import LayerScheduleMonth from './LayerScheduleMonth';

import { useSetRecoilState } from 'recoil';
import { selectedNodeIdState } from 'recoil/node';
import { IMindNode } from 'types/mindmap';
import { getTodayISODate } from 'utils/date';

const ScheduleCalendar = () => {
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState);

  const [hoveredNode, setHoveredNode] = useState<IMindNode | null>(null);
  const [currentDateISO, setCurrentDateISO] = useState(getTodayISODate());

  const handleClickOutside = () => setSelectedNodeId(null);

  return (
    <Wrapper onClick={() => handleClickOutside()}>
      <MonthSelector currentDateISO={currentDateISO} setCurrentDateISO={setCurrentDateISO} />
      <CalendarWrapper>
        <Calendar currentDateISO={currentDateISO} />
      </CalendarWrapper>
      <LayerWrapper className={hoveredNode ? 'blur no-click' : 'no-click'}>
        <LayerSprintMonth currentDateISO={currentDateISO} />
      </LayerWrapper>
      <LayerWrapper className={hoveredNode ? 'blur' : ''}>
        <LayerScheduleMonth currentDateISO={currentDateISO} setHoveredNode={setHoveredNode} />
      </LayerWrapper>
      <LayerWrapper className={'no-click'}>
        <LayerTaskDetailMonth currentDateISO={currentDateISO} hoveredNode={hoveredNode} />
      </LayerWrapper>
    </Wrapper>
  );
};

export default ScheduleCalendar;
