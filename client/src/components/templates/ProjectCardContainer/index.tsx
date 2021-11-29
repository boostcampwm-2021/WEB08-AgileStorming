import React from 'react';
import styled from '@emotion/styled';
import { IProject } from 'pages/Project';
import { ProjectCard } from 'components/organisms';
import { NewProjectModalWrapper } from 'components/templates';
import useToast from 'hooks/useToast';
import { API } from 'utils/api';
import useCustomHistory from 'hooks/useCustomHistory';

const StyledProjectCardContainer = styled.div`
  ${(props) => props.theme.flex.row}
  flex-wrap: wrap;
  margin: ${(props) => props.theme.margin.xxxlarge};
`;

interface IProps {
  projectList: Array<IProject>;
  setProjectList: React.Dispatch<React.SetStateAction<Array<IProject>>>;
}

const ProjectCardContainer: React.FC<IProps> = ({ projectList, setProjectList }) => {
  const { showMessage } = useToast();
  const { historyPush } = useCustomHistory();
  const handleClickShareButton = (event: React.MouseEvent<HTMLButtonElement>, projectId: string) => {
    event.stopPropagation();
    navigator.clipboard.writeText(process.env.REACT_APP_CLIENT + 'mindmap:' + projectId);
    showMessage('마인드맵 링크가 클립보드에 복사되었습니다.');
  };
  const handleClickTrashButton = (event: React.MouseEvent<HTMLButtonElement>, projectId: string, userId: string) => {
    event.stopPropagation();
    if (!user || user.id !== userId) return showMessage('프로젝트 관리자만 삭제할 수 있습니다.');
    setProjectList((list) => list.filter((p) => p.id !== projectId));
    API.project.delete(projectId);
  };
  const handleClickProjectCard = (projectId: string) => {
    historyPush(`mindmap`, projectId);
  };
  const addNewProject = (newProject: IProject) => {
    const newProjectWithCount = { ...newProject, count: 1 };
    setProjectList((list) => [...list, newProjectWithCount]);
  };
  return (
    <StyledProjectCardContainer>
      <NewProjectModalWrapper addNewProject={addNewProject} />
      {projectList.map(({ id, name, count, creator }) => {
        return (
          <ProjectCard
            key={id}
            projectId={id}
            name={name}
            count={count}
            creator={creator}
            onClickProjectCard={() => handleClickProjectCard(id)}
            onClickShareButton={(event: React.MouseEvent<HTMLButtonElement>) => handleClickShareButton(event, id)}
            onClickDeleteButton={(event: React.MouseEvent<HTMLButtonElement>) => handleClickTrashButton(event, id, creator.id)}
          />
        );
      })}
    </StyledProjectCardContainer>
  );
};

export default ProjectCardContainer;
