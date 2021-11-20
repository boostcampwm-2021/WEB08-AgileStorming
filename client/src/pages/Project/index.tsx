import { ProjectCardContainer } from 'components/templates';
import useAuthentication from 'hooks/useAuthentication';
import useSocketDisconnect from 'hooks/useSocketDisconnect';
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
  useAuthentication();
  useSocketDisconnect();
  const [projectList, setProjectList] = useState([] as Array<IProject>);
  useEffect(() => {
    const getProjectList = async () => {
      const projectListData = await API.project.get();
      setProjectList(projectListData);
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
