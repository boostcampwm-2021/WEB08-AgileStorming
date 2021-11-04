import { ProjectCardContainer } from 'components/templates';
import { useEffect, useState } from 'react';
import { API } from 'utils/api';

export interface IProject {
  id: string;
  name: string;
  createdAt: string;
  count: number;
  creator: {
    color: string;
    icon: string;
    id: string;
    name: string;
  };
}

const Project = () => {
  const [projectList, setProjectList] = useState([] as Array<IProject>);
  useEffect(() => {
    const getProjectList = async () => {
      const projectList = await API.project.get();
      setProjectList(projectList);
    };
    getProjectList();
    return;
  }, []);
  return (
    <>
      <ProjectCardContainer projectList={projectList} setProjectList={setProjectList} />
    </>
  );
};

export default Project;
