import CommonLayout from 'components/templates/CommonLayout';
import { TaskCardContainer } from 'components/templates';
import { Wrapper } from 'components/atoms';
import { useRecoilValue } from 'recoil';
import { taskState } from 'recoil/mindmap';

const Kanban = () => {
  const taskNodes = useRecoilValue(taskState);
  const toDoTasks = taskNodes.filter((task) => task.status === 'To Do');
  const inProgressTasks = taskNodes.filter((task) => task.status === 'In Progress');
  const doneTasks = taskNodes.filter((task) => task.status === 'Done');
  return (
    <CommonLayout>
      <Wrapper flex={'center'}>
        <TaskCardContainer status={'To Do'} taskList={toDoTasks} />
        <TaskCardContainer status={'In Progress'} taskList={inProgressTasks} />
        <TaskCardContainer status={'Done'} taskList={doneTasks} />
      </Wrapper>
    </CommonLayout>
  );
};

export default Kanban;
