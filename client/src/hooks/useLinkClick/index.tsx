import useProjectId from 'hooks/useRoomId';
import { useHistory } from 'react-router';

type TPath = 'project' | 'mindmap' | 'history' | 'kanban' | 'calendar' | 'chart';

const useLinkClick = (path: TPath) => {
  const history = useHistory();
  const projectId = useProjectId();

  const handleLinkClick = () => {
    history.push(`/${path}/${projectId}`);
  };

  return handleLinkClick;
};

export default useLinkClick;
