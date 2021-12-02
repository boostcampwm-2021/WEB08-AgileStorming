import React from 'react';
import { useRecoilValue } from 'recoil';
import { StyledTaskCard, StyledCardInfoLeft, StyledCardInfoRight, StyledTaskTitle, StyledIconContainer } from './style';
import { SmallText, UserIcon, LabelIcon, Wrapper } from 'components/atoms';
import { TaskInfo } from 'components/molecules';
import { labelListState, sprintListState, userListState } from 'recoil/project';
import { IMindNode } from 'types/mindmap';

interface IProps {
  taskInfo: IMindNode;
  setSelectedNodeIdTask: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseDownTask: (event: React.MouseEvent<HTMLElement>) => void;
}

const TaskCard: React.FC<IProps> = ({ taskInfo, setSelectedNodeIdTask, onMouseDownTask }) => {
  const userList = useRecoilValue(userListState)!;
  const sprintList = useRecoilValue(sprintListState)!;
  const labelList = useRecoilValue(labelListState)!;
  const user = taskInfo.assigneeId ? userList[taskInfo.assigneeId] : undefined;

  return (
    <StyledTaskCard onDoubleClick={setSelectedNodeIdTask} onMouseDown={onMouseDownTask}>
      <StyledTaskTitle onClick={setSelectedNodeIdTask}>{taskInfo.content}</StyledTaskTitle>
      <Wrapper flex={'row'}>
        <StyledCardInfoLeft>
          <TaskInfo title={'담당자: '} content={user ? user.name : ''}>
            {user !== undefined ? <UserIcon user={user} /> : ''}
          </TaskInfo>
          <TaskInfo title={'중요도: '} content={taskInfo.priority!}></TaskInfo>
        </StyledCardInfoLeft>
        <StyledCardInfoRight>
          <TaskInfo
            title={'스프린트: '}
            content={taskInfo.sprintId && sprintList[taskInfo.sprintId] ? sprintList[taskInfo.sprintId].name : ''}
          ></TaskInfo>
          <TaskInfo title={'예상 소요 시간: '} content={taskInfo.estimatedTime ?? ''}>
            {taskInfo.estimatedTime ? (
              <SmallText color={'black'} margin={'0 0 0 3px'}>
                {'시간'}
              </SmallText>
            ) : null}
          </TaskInfo>
          <TaskInfo title={'마감 시간: '} content={taskInfo.dueDate!}></TaskInfo>
        </StyledCardInfoRight>
      </Wrapper>
      {taskInfo.labelIds ? (
        <StyledIconContainer>
          {JSON.parse(taskInfo.labelIds).map((labelId: number) => (
            <LabelIcon key={labelId} label={labelList[labelId]} />
          ))}
        </StyledIconContainer>
      ) : null}
    </StyledTaskCard>
  );
};

const isPropsEqual = (prev: IProps, curr: IProps) => JSON.stringify(prev.taskInfo) === JSON.stringify(curr.taskInfo);
const TaskCardMemo = React.memo(TaskCard, isPropsEqual);
export default TaskCardMemo;
