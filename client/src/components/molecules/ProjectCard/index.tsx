import React from 'react';
import { ShareButton } from 'components/atoms';

interface IProps {
  projectId: string;
}

const ProjectCard: React.FC<IProps> = ({ projectId }) => {
  const handleClickShareButton = () => {
    navigator.clipboard.writeText(process.env.REACT_APP_CLIENT + 'mindmap:' + projectId);
  };

  return (
    <>
      <ShareButton onClick={handleClickShareButton} />
    </>
  );
};

const isPropsEqual = (prev: IProps, current: IProps) => {
  return prev.projectId === current.projectId;
};

const ProjectCardMemo = React.memo(ProjectCard, isPropsEqual);

export default ProjectCardMemo;
