import TaskBacklog from './TaskBacklog';
import { StoryRow } from './style';
import { useRecoilValue } from 'recoil';
import { filteredTaskState } from 'recoil/project';
import { IMindNode } from 'types/mindmap';

interface IProps {
  story: IMindNode;
}

const StoryBacklog: React.FC<IProps> = ({ story }) => {
  const filteredTaskList = useRecoilValue(filteredTaskState);
  const activeTaskList = story.children.filter((taskId) => filteredTaskList[taskId]).map((taskId) => filteredTaskList[taskId]);

  if (!activeTaskList.length) {
    return null;
  }

  let totalEstimatedTime = 0;
  let totalUsedTime = 0;

  activeTaskList.forEach((task) => {
    totalEstimatedTime += Number(task.estimatedTime);
    totalUsedTime += Number(task.finishedTime);
  });

  const storyRowData = [
    `${story.nodeId}`,
    `${story.content}`,
    totalEstimatedTime ? `${totalEstimatedTime}시간` : '-',
    totalUsedTime ? `${totalUsedTime}시간` : '-',
    '',
  ];

  return (
    <>
      <StoryRow>
        {storyRowData.map((data, idx) => (
          <td key={idx}>{data}</td>
        ))}
      </StoryRow>
      {activeTaskList.map((task) => (
        <TaskBacklog key={task.nodeId} task={task} />
      ))}
    </>
  );
};

export default StoryBacklog;
