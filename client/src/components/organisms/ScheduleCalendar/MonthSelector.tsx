import { IconButton } from 'components/molecules';
import { arrowLeft, arrowRight } from 'img';
import { getNextMonthISODate, getPrevMonthISODate, parseISODate } from 'utils/date';
import { MonthSelectorWrapper } from './style';

interface IProps {
  currentDateISO: string;
  setCurrentDateISO: React.Dispatch<React.SetStateAction<string>>;
}

const MonthSelector: React.FC<IProps> = ({ currentDateISO, setCurrentDateISO }) => {
  const { year, month } = parseISODate(currentDateISO);
  const currentYearMonth = `${year}년 ${month}월`;
  const handleClickNextMonth = () => setCurrentDateISO(getNextMonthISODate(currentDateISO));
  const handleClickPrevMonth = () => setCurrentDateISO(getPrevMonthISODate(currentDateISO));

  return (
    <MonthSelectorWrapper>
      <IconButton imgSrc={arrowLeft} onClick={handleClickPrevMonth} altText={'prev Month'} size={{ width: '50px', height: '50px' }} />
      <span>{currentYearMonth}</span>
      <IconButton imgSrc={arrowRight} onClick={handleClickNextMonth} altText={'prev Month'} size={{ width: '50px', height: '50px' }} />
    </MonthSelectorWrapper>
  );
};

export default MonthSelector;
