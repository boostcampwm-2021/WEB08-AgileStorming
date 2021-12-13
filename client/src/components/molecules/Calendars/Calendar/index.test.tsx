import Calendar from '.';
import { testRender } from 'utils/test';

describe('달력은', () => {
  const renderCalendar = () => testRender(<Calendar currentDateISO={'2021-11-13'} />);

  it('이번 달의 모든 날짜를 표기한다.', () => {
    const { queryByText } = renderCalendar();
    expect(queryByText('30')).toBeInTheDocument();
  });

  it('이번달 날짜를 초과해 표기하지 않는다.', () => {
    const { queryByText } = renderCalendar();
    expect(queryByText('31')).toBeNull();
  });

  it('윤년을 고려한다.', () => {
    const { queryByText } = testRender(<Calendar currentDateISO={'2020-02-01'} />);
    expect(queryByText('29')).toBeInTheDocument();
  });
});
