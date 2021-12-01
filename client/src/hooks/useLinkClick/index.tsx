import useProjectId from 'hooks/useProjectId';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { TPage } from 'types/page';

const useLinkClick = (path: TPage) => {
  const history = useHistory();
  const projectId = useProjectId();

  const handleLinkClick = useCallback(() => {
    history.push(`/${path}/${projectId}`);
  }, [history, projectId]);

  return handleLinkClick;
};

export default useLinkClick;
