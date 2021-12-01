import { Title, UserIcon, Wrapper } from 'components/atoms';
import useCustomHistory from 'hooks/useCustomHistory';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { assigneeFilterState, filteredUserInProgressTaskState, userMouseOverState } from 'recoil/project';
import { IUser } from 'types/user';
import {
  StyledUserInProgressContainer,
  StyledUserInProgressBackground,
  StyledDivider,
  StyledTask,
  StyledTextFlow,
  StyledTextButton,
} from './style';

interface IProps {
  user: IUser;
}

export const UserInProgressList: React.FC<IProps> = ({ user }) => {
  const filteredUserInProgressTask = useRecoilValue(filteredUserInProgressTaskState);
  const mouseOverUser = useRecoilValue(userMouseOverState);
  const setAssigneeFilter = useSetRecoilState(assigneeFilterState);
  const { historyPush } = useCustomHistory();
  const handleOnClick = () => {
    setAssigneeFilter(mouseOverUser);
    historyPush('kanban');
  };
  return (
    <StyledUserInProgressContainer>
      <StyledUserInProgressBackground>
        <Wrapper flex={'rowCenter'}>
          <Title titleStyle={'large'} margin='0 5px 0 0'>
            {'In Progress'}
          </Title>
          <UserIcon user={user} />
        </Wrapper>
        <StyledDivider />
        <Wrapper flex={'column'}>
          {filteredUserInProgressTask.map((task) => {
            return (
              <StyledTask key={task.nodeId}>
                <StyledTextFlow>{`# ${task.content}`}</StyledTextFlow>
              </StyledTask>
            );
          })}
        </Wrapper>
        <StyledTextButton onClick={handleOnClick}>{'칸반보드에서 보기'}</StyledTextButton>
      </StyledUserInProgressBackground>
    </StyledUserInProgressContainer>
  );
};

export default UserInProgressList;
