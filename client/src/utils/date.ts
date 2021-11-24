interface IDate {
  year: number;
  month: number;
  date: number;
}

const getTodayDate = () => {
  const today = new Date();
  return { year: today.getFullYear(), month: today.getMonth() + 1, date: today.getDate() };
};

const isSameDate = (A: IDate, B: IDate) => A.year === B.year && A.month === B.month && A.date === B.date;

const makeISODate = ({ year, month, date }: IDate) => `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;

const getTodayISODate = () => new Date().toISOString().slice(0, 10);

const parseISODate = (ISODate: string) => {
  const [year, month, date] = ISODate.split('-').map((x) => Number(x));
  return { year, month, date };
};

const getNextMonthISODate = (ISODate: string) => {
  const { year, month } = parseISODate(ISODate);
  return new Date(year, month + 1).toISOString().slice(0, 10);
};

const getPrevMonthISODate = (ISODate: string) => {
  const { year, month } = parseISODate(ISODate);
  return new Date(year, month - 1).toISOString().slice(0, 10);
};

export { getTodayDate, isSameDate, makeISODate, getTodayISODate, parseISODate, getNextMonthISODate, getPrevMonthISODate };
