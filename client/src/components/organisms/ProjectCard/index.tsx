import React from 'react';
import styled from '@emotion/styled';
import * as img from 'img';
import { IconButton } from 'components/molecules';

interface IProps {
  projectId: string;
  onClickShareButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledProjectCard = styled.div`
  ${(props) => props.theme.flex.column}
  width: 320px;
  height: 300px;
  background: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray3};
  border-radius: 5px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  margin: 10px;
  :hover {
    cursor: pointer;
    background: ${(props) => props.theme.color.bgWhite};
  }
`;

const ProjectCard: React.FC<IProps> = ({ projectId, onClickShareButton }) => {
  return (
    <StyledProjectCard>
      <IconButton onClick={onClickShareButton} imgSrc={img.share} />
    </StyledProjectCard>
  );
};

const isPropsEqual = (prev: IProps, current: IProps) => {
  return prev.projectId === current.projectId;
};

const ProjectCardMemo = React.memo(ProjectCard, isPropsEqual);

export default ProjectCardMemo;
