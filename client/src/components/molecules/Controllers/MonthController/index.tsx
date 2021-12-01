import React from 'react';
import { IconButton } from 'components/molecules';
import { MonthSelectorWrapper } from './style';
import { arrowLeft, arrowRight } from 'img';
import { getNextMonthISODate, getPrevMonthISODate, parseISODate } from 'utils/date';

interface IProps {
  currentDateISO: string;
  setCurrentDateISO: React.Dispatch<React.SetStateAction<string>>;
}

const MonthController: React.FC<IProps> = ({ currentDateISO, setCurrentDateISO }) => {
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

const MonthControllerMemo = React.memo(MonthController);

export default MonthControllerMemo;
