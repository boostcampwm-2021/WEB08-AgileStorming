import { Title, UserIcon, Wrapper } from 'components/atoms';
import useProjectId from 'hooks/useRoomId';
import React from 'react';
import { useHistory } from 'react-router';
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
  const history = useHistory();
  const projectId = useProjectId();
  const handleOnClick = () => {
    setAssigneeFilter(mouseOverUser);
    history.push('/kanban/' + projectId);
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
                <Title titleStyle={'normal'} margin='0 5px 0 0'>{`#${task.nodeId}: `}</Title>
                <StyledTextFlow>{task.content}</StyledTextFlow>
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
