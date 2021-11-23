import { useState } from 'react';
import { CalendarHeader, CalendarWrapper } from './style';
import { getTodayISODate, parseISODate } from 'utils/date';
import MonthSelector from './MonthSelector';
import Day from './Day';

const ScheduleCalendar = () => {
  const [currentDateISO, setCurrentDateISO] = useState(getTodayISODate());
  const columns = ['일', '월', '화', '수', '목', '금', '토'];
  const { year, month } = parseISODate(currentDateISO);
  const prevDays = new Date(year, month - 1, 1).getDay();
  const days = new Date(year, month, 0).getDate();
  const nextDays = 6 - new Date(year, month, 0).getDay();

  return (
    <>
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
            <Day key={idx} dayDate={{ year, month, date: idx + 1 }} />
          ))}
        {Array(nextDays)
          .fill(0)
          .map((_, idx) => (
            <Day key={idx} />
          ))}
      </CalendarWrapper>
    </>
  );
};

export default ScheduleCalendar;
