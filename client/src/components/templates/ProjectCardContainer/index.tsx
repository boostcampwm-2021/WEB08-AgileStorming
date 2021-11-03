import styled from '@emotion/styled';
import { ProjectCard } from 'components/organisms';
import useToast from 'hooks/toast';

const StyledProjectCardContainer = styled.div`
  ${(props) => props.theme.flex.row}
  flex-wrap: wrap;
`;

const ProjectCardContainer = () => {
  const { showMessage } = useToast();
  const projectIdList = ['123456', '123457', '123458', '123468', '124458', '122458', '123777'];
  const handleClickShareButton = (projectId: string) => {
    navigator.clipboard.writeText(process.env.REACT_APP_CLIENT + 'mindmap:' + projectId);
    showMessage('마인드맵 링크가 클립보드에 복사되었습니다.');
  };
  return (
    <StyledProjectCardContainer>
      {projectIdList.map((projectId) => (
        <ProjectCard key={projectId} projectId={projectId} onClickShareButton={() => handleClickShareButton(projectId)} />
      ))}
    </StyledProjectCardContainer>
  );
};

export default ProjectCardContainer;
