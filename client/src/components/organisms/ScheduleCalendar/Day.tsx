import { getTodayDate, isSameDate } from 'utils/date';
import { DayWrapper } from './style';

interface IProps {
  dayDate?: { year: number; month: number; date: number };
}

const Day: React.FC<IProps> = ({ dayDate }) => {
  const todayDate = getTodayDate();

  if (!dayDate) {
    return <DayWrapper disable={true}></DayWrapper>;
  }

  const { year, month, date } = dayDate;
  return <DayWrapper today={isSameDate(dayDate, todayDate)}>{date}</DayWrapper>;
};

export default Day;
