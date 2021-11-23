import { IMindNode } from 'types/mindmap';
import { makeISODate } from 'utils/date';
import { LayerDayWrapper } from './style';

interface IProps {
  dayDate?: { year: number; month: number; date: number };
  task?: IMindNode | null;
}

const Day: React.FC<IProps> = ({ dayDate, task }) => {
  if (!dayDate || !task) {
    return <LayerDayWrapper></LayerDayWrapper>;
  }

  const ISODate = makeISODate(dayDate);
  const taskCreatedISODate = new Date(task.createdAt!).toISOString().slice(0, 10);

  const today = new Date();
  const day = new Date(ISODate);
  const createdAt = task.createdAt ? new Date(task.createdAt) : null;
  const startedAt = task.startDate ? new Date(task.startDate) : null;
  const endedAt = task.endDate ? new Date(task.endDate) : null;
  const dueAt = task.dueDate ? new Date(task.dueDate) : null;

  return (
    <LayerDayWrapper>
      {task.createdAt && taskCreatedISODate === ISODate ? <div className={'created'}>태스크 생성</div> : ''}
      {task.startDate && task.startDate === ISODate ? <div className={'started'}>태스크 시작</div> : ''}
      {task.endDate && task.endDate === ISODate ? <div className={'ended'}>태스크 종료</div> : ''}
      {task.dueDate && task.dueDate === ISODate ? <div className={'due'}>마감 날짜</div> : ''}

      {createdAt && startedAt && dueAt && day > createdAt && day < startedAt && day && day < dueAt ? <hr className={'waiting'} /> : ''}
      {createdAt && !startedAt && dueAt && day > createdAt && day < dueAt && today > dueAt ? <hr className={'delaying'} /> : ''}
      {startedAt && endedAt && dueAt && day > startedAt && day < endedAt && day < dueAt ? <hr className={'working'} /> : ''}
      {startedAt && !endedAt && dueAt && day > startedAt && day < dueAt && today > dueAt ? <hr className={'delaying'} /> : ''}
      {endedAt && dueAt && day > endedAt && day < dueAt ? <hr className={'resting'} /> : ''}
      {!endedAt && dueAt && day > dueAt && day < today ? <hr className={'delaying'} /> : ''}
    </LayerDayWrapper>
  );
};

export default Day;
