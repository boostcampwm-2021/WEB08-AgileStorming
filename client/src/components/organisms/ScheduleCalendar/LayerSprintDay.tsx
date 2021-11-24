import { ISprint } from 'types/sprint';
import { makeISODate } from 'utils/date';
import { LayerSprint, LayerSprintDayWrapper } from './style';

interface IProps {
  dayDate?: { year: number; month: number; date: number };
  sprints?: ISprint[];
}

const LayerSprintDay: React.FC<IProps> = ({ dayDate, sprints }) => {
  if (!dayDate || !sprints) {
    return <LayerSprintDayWrapper></LayerSprintDayWrapper>;
  }
  sprints.sort((a, b) => {
    const aStartAt = new Date(a.startDate);
    const bStartAt = new Date(b.startDate);
    if (aStartAt < bStartAt) {
      return -1;
    } else {
      return 1;
    }
  });

  const ISODate = makeISODate(dayDate);
  const day = new Date(ISODate);

  return (
    <LayerSprintDayWrapper>
      {sprints.map(({ id, startDate, endDate, color }) => {
        if (startDate === ISODate) {
          return <LayerSprint key={id} className={'start'} color={color} />;
        }

        if (endDate === ISODate) {
          return <LayerSprint key={id} className={'end'} color={color} />;
        }

        const startAt = new Date(startDate);
        const endAt = new Date(endDate);

        if (day > startAt && day < endAt) {
          return <LayerSprint key={id} color={color} />;
        }
      })}
    </LayerSprintDayWrapper>
  );
};

export default LayerSprintDay;
