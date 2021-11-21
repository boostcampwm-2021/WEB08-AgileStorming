import useProjectId from 'hooks/useRoomId';
import { useHistory } from 'react-router';
import { TPage } from 'types/page';

const useLinkClick = (path: TPage) => {
  const history = useHistory();
  const projectId = useProjectId();

  const handleLinkClick = () => {
    history.push(`/${path}/${projectId}`);
  };

  return handleLinkClick;
};

export default useLinkClick;
