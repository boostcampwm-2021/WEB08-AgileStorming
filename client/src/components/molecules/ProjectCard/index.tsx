import React from 'react';
import styled from '@emotion/styled';
import { ShareButton } from 'components/atoms';

interface IProps {
  projectId: string;
  onClickShareButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledProjectCard = styled.div`
  width: 150px;
  height: 300px;
  background: ${(props) => props.theme.color.bgWhite};
  border: 1px solid ${(props) => props.theme.color.black};
  border-radius: 8px;
  margin: 10px;
`;

const ProjectCard: React.FC<IProps> = ({ projectId, onClickShareButton }) => {
  return (
    <StyledProjectCard>
      <ShareButton onClick={onClickShareButton} />
    </StyledProjectCard>
  );
};

const isPropsEqual = (prev: IProps, current: IProps) => {
  return prev.projectId === current.projectId;
};

const ProjectCardMemo = React.memo(ProjectCard, isPropsEqual);

export default ProjectCardMemo;
