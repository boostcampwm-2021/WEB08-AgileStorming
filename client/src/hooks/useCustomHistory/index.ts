import { useHistory } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectIdState, urlLocationState } from 'recoil/project';
import { PAGES } from 'utils/helpers';

const PROJECT_ID_LENGTH = 36;
const BASE_URL = '/';
const getParsedLocation = () => window.location.href.split('/');
const getPath = (pageName: string, id: string | null) => (id ? `/${pageName}/${id}` : `/${pageName}`);

const useCumstomHistory = () => {
  const projectId = useRecoilValue(projectIdState);
  const history = useHistory();
  const setUrlLocation = useSetRecoilState(urlLocationState);

  const historyInit = () => {
    const parsedLocation = getParsedLocation();
    const lastParsed = parsedLocation.pop();
    if (!lastParsed) return;

    const isInProject = lastParsed && lastParsed?.length === PROJECT_ID_LENGTH;
    if (isInProject) {
      const id = lastParsed;
      const pageName = parsedLocation.pop();
      if (!pageName || !PAGES.includes(pageName)) return;
      historyReplace(pageName, id);
    } else {
      const pageName = lastParsed;
      historyReplace(pageName);
    }
  };

  const historyReplace = (pageName: string, id: string | null = null) => {
    const path = getPath(pageName, id);
    setUrlLocation(pageName);
    history.replace({ pathname: path, state: { pageName: pageName } });
  };

  const historyPush = (pageName: string, id: string | null = projectId) => {
    setUrlLocation(pageName);
    const path = getPath(pageName, id);
    history.push({ pathname: path, state: { pageName: pageName } });
  };

  const historyPop = (e: PopStateEvent) => {
    const lastParsed = getParsedLocation().pop();
    const candidatePageName = lastParsed ? lastParsed : BASE_URL;
    const pageName = e?.state?.state?.pageName ?? candidatePageName;
    if (pageName) setUrlLocation(pageName);
    else setUrlLocation('/');
  };

  const redirectLogin = () => {
    const parsedLocation = getParsedLocation();
    const id = parsedLocation.pop();
    const pageName = parsedLocation.pop();
    setUrlLocation('/');
    history.push({ pathname: '/', state: { redirectPage: pageName, projectId: id } });
  };

  return {
    historyInit,
    historyPush,
    historyPop,
    redirectLogin,
  };
};

export default useCumstomHistory;
