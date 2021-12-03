import React from 'react';
import { useRecoilValue } from 'recoil';
import { LayerSprintDay } from 'components/atoms';
import { sprintListState } from 'recoil/project';
import { parseISODate } from 'utils/date';

interface IProps {
  currentDateISO: string;
}

const LayerSprintMonth: React.FC<IProps> = ({ currentDateISO }) => {
  const sprintList = useRecoilValue(sprintListState);
  const { year, month } = parseISODate(currentDateISO);
  const prevDays = new Date(year, month - 1, 1).getDay();
  const days = new Date(year, month, 0).getDate();
  const nextDays = 6 - new Date(year, month, 0).getDay();

  return (
    <>
      {Array(prevDays)
        .fill(0)
        .map((_, idx) => (
          <LayerSprintDay key={idx} />
        ))}
      {Array(days)
        .fill(0)
        .map((_, idx) => (
          <LayerSprintDay key={idx} dayDate={{ year, month, date: idx + 1 }} sprints={Object.values(sprintList)} />
        ))}
      {Array(nextDays)
        .fill(0)
        .map((_, idx) => (
          <LayerSprintDay key={idx} />
        ))}
    </>
  );
};

const LayerSprintMonthMemo = React.memo(LayerSprintMonth);

export default LayerSprintMonthMemo;
