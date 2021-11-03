import { ProjectCardContainer, NewProjectModalWrapper } from 'components/templates';
import { Toast } from 'components/atoms';

const Project = () => {
  return (
    <>
      <ProjectCardContainer />
      <NewProjectModalWrapper />
      <Toast />
    </>
  );
};

export default Project;
