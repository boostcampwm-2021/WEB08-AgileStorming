import { useParams } from 'react-router';

interface IParams {
  projectId: string;
}

const useProjectId = () => {
  const params = useParams<IParams>();
  return params.projectId;
};

export default useProjectId;
