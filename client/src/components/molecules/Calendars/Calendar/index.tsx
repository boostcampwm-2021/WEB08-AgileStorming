import React from 'react';
import { getTodayISODate, makeISODate, parseISODate } from 'utils/date';
import { CalendarDay, CalendarHeader } from './style';

interface IProps {
  currentDateISO: string;
}

const Calendar: React.FC<IProps> = ({ currentDateISO }) => {
  const columns = ['일', '월', '화', '수', '목', '금', '토'];
  const { year, month } = parseISODate(currentDateISO);
  const prevDays = new Date(year, month - 1, 1).getDay();
  const days = new Date(year, month, 0).getDate();
  const nextDays = 6 - new Date(year, month, 0).getDay();
  const todayISODate = getTodayISODate();

  return (
    <>
      {columns.map((column, idx) => (
        <CalendarHeader key={idx}>{column}</CalendarHeader>
      ))}
      {Array(prevDays)
        .fill(0)
        .map((_, idx) => (
          <CalendarDay key={idx} disable={true} />
        ))}
      {Array(days)
        .fill(0)
        .map((_, idx) => (
          <CalendarDay key={idx} today={makeISODate({ year, month, date: idx + 1 }) === todayISODate}>
            {idx + 1}
          </CalendarDay>
        ))}
      {Array(nextDays)
        .fill(0)
        .map((_, idx) => (
          <CalendarDay key={idx} disable={true} />
        ))}
    </>
  );
};

const CalendarMemo = React.memo(Calendar);

export default CalendarMemo;
