import { TaskRow } from './style';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedNodeIdState } from 'recoil/node';
import { labelListState, sprintListState, userListState } from 'recoil/project';
import { ColorIcon, UserIcon, LabelIcon } from 'components/atoms';
import { IMindNode } from 'types/mindmap';

interface IProps {
  task: IMindNode;
}

const StoryBacklog: React.FC<IProps> = ({ task }) => {
  const userList = useRecoilValue(userListState);
  const sprintList = useRecoilValue(sprintListState);
  const labelList = useRecoilValue(labelListState);

  const setSelectedNode = useSetRecoilState(selectedNodeIdState);

  const taskRowData = [
    `${task.nodeId}`,
    `${task.content}`,
    task.sprintId && sprintList[task.sprintId] ? (
      <>
        <ColorIcon key={task.nodeId} color={sprintList[task.sprintId].color} />
        {sprintList[task.sprintId].name}
      </>
    ) : (
      '-'
    ),
    task.assigneeId ? (
      <>
        <UserIcon key={task.nodeId} user={userList[task.assigneeId]} />
        {userList[task.assigneeId].name}
      </>
    ) : (
      '-'
    ),
    `${task.priority ?? '-'}`,
    `${task.dueDate ?? '-'}`,
    `${task.estimatedTime ? task.estimatedTime + '시간' : '-'}`,
    `${task.finishedTime ? task.finishedTime + '시간' : '-'}`,
    task.labelIds ? (
      <>
        {JSON.parse(task.labelIds).map((labelId: number) => (
          <LabelIcon key={labelId} label={labelList[labelId]} />
        ))}
      </>
    ) : (
      ''
    ),
  ];

  const handleClickTaskRow = () => setSelectedNode(task.nodeId);

  return (
    <>
      <TaskRow className={'task-row'} onClick={handleClickTaskRow}>
        {taskRowData.map((data, idx) => (
          <td key={idx}>{data}</td>
        ))}
      </TaskRow>
    </>
  );
};

export default StoryBacklog;
