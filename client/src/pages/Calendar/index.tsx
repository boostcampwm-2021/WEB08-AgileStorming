import { Wrapper } from 'components/atoms';
import { ScheduleCalendar } from 'components/organisms';
import { CommonLayout } from 'components/templates';

const Calendar = () => {
  return (
    <CommonLayout>
      <Wrapper flex={'columnCenter'}>
        <ScheduleCalendar />
      </Wrapper>
    </CommonLayout>
  );
};

export default Calendar;
