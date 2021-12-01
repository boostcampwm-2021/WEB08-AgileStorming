import { useState } from 'react';
import { CalendarWrapper, LayerWrapper, Wrapper } from './style';

import { useSetRecoilState } from 'recoil';
import { selectedNodeIdState } from 'recoil/node';
import { IMindNode } from 'types/mindmap';
import { getTodayISODate } from 'utils/date';
import { Calendar, LayerScheduleCalendar, LayerSprintCalendar, LayerTaskDetailCalendar, MonthController } from 'components/molecules';

const ScheduleCalendar = () => {
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState);

  const [hoveredNode, setHoveredNode] = useState<IMindNode | null>(null);
  const [currentDateISO, setCurrentDateISO] = useState(getTodayISODate());

  const handleClickOutside = () => setSelectedNodeId(null);

  return (
    <Wrapper onClick={() => handleClickOutside()}>
      <MonthController currentDateISO={currentDateISO} setCurrentDateISO={setCurrentDateISO} />
      <CalendarWrapper>
        <Calendar currentDateISO={currentDateISO} />
      </CalendarWrapper>
      <LayerWrapper className={hoveredNode ? 'blur no-click' : 'no-click'}>
        <LayerSprintCalendar currentDateISO={currentDateISO} />
      </LayerWrapper>
      <LayerWrapper className={hoveredNode ? 'blur' : ''}>
        <LayerScheduleCalendar currentDateISO={currentDateISO} setHoveredNode={setHoveredNode} />
      </LayerWrapper>
      <LayerWrapper className={'no-click'}>
        <LayerTaskDetailCalendar currentDateISO={currentDateISO} hoveredNode={hoveredNode} />
      </LayerWrapper>
    </Wrapper>
  );
};

export default ScheduleCalendar;
