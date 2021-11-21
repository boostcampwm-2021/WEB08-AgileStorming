import CommonLayout from 'components/templates/CommonLayout';
import { TaskCardContainer } from 'components/templates';
import { Wrapper } from 'components/atoms';
import { useRecoilValue } from 'recoil';
import { filteredTaskState } from 'recoil/project';

const Kanban = () => {
  const taskNodes = useRecoilValue(filteredTaskState);
  const taskNodesList = Array.from(Object.values(taskNodes));
  const toDoTasks = taskNodesList.filter((task) => !task.status || task.status === 'To Do');
  const inProgressTasks = taskNodesList.filter((task) => task.status === 'In Progress');
  const doneTasks = taskNodesList.filter((task) => task.status === 'Done');
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
