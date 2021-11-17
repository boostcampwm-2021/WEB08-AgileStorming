import React from 'react';
import { useRecoilValue } from 'recoil';
import { queryUserListState } from 'recoil/user-list';
import { IMindNode } from 'types/mindmap';
import { Title, SmallText, UserIcon, Wrapper } from 'components/atoms';
import { TaskInfo } from 'components/molecules';
import { StyledTaskCard, StyledCardInfoLeft, StyledCardInfoRight } from './style';
interface IProps {
  taskInfo: IMindNode;
  onDoubleClickTask: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseDownTask: (event: React.MouseEvent<HTMLElement>) => void;
}

const TaskCard: React.FC<IProps> = ({ taskInfo, onDoubleClickTask, onMouseDownTask }) => {
  const userList = useRecoilValue(queryUserListState)!;
  const user = userList[taskInfo.assignee!];
  return (
    <StyledTaskCard onDoubleClick={onDoubleClickTask} onMouseDown={onMouseDownTask}>
      <Title titleStyle={'normal'}>{taskInfo.content}</Title>
      <Wrapper flex={'row'}>
        <StyledCardInfoLeft>
          <TaskInfo title={'담당자: '} content={user.name}>
            <UserIcon user={user} />
          </TaskInfo>
          <TaskInfo title={'중요도: '} content={taskInfo.priority!}></TaskInfo>
          <TaskInfo
            title={'라벨: '}
            content={
              taskInfo.labels!.reduce((pre, e) => {
                return pre + ', ' + e;
              }, '')!
            }
          ></TaskInfo>
        </StyledCardInfoLeft>
        <StyledCardInfoRight>
          <TaskInfo title={'스프린트: '} content={taskInfo.sprint as unknown as string}></TaskInfo>
          <TaskInfo title={'예상 소요 시간: '} content={taskInfo.estimatedTime as unknown as string}>
            <SmallText color={'black'} margin={'0 0 0 3px'}>
              {'시간 '}
            </SmallText>
          </TaskInfo>
          <TaskInfo title={'마감 시간: '} content={taskInfo.dueDate!}></TaskInfo>
        </StyledCardInfoRight>
      </Wrapper>
    </StyledTaskCard>
  );
};

export default TaskCard;
