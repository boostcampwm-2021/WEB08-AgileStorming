import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { TextLink, HeaderContainer, Icon, TextBox } from './style';
import useCustomHistory from 'hooks/useCustomHistory';
import * as img from 'img';
import { urlLocationState } from 'recoil/project';
import { PAGES } from 'utils/helpers';

const TABS = ['마인드맵', '칸반보드', '캘린더', '차트', '백로그'];

const Header: React.FC = () => {
  const { historyInit, historyPush, historyPop } = useCustomHistory();
  const urlLocation = useRecoilValue(urlLocationState);
  const isSelected = (link: string) => link === urlLocation;
  const isInProject = PAGES.includes(urlLocation);
  const isLoginPage = urlLocation === '/';

  useEffect(() => {
    historyInit();
    window.addEventListener('popstate', historyPop);
    return () => window.removeEventListener('popstate', historyPop);
  }, []);

  return (
    <>
      {!isLoginPage && (
        <HeaderContainer>
          {isInProject && (
            <>
              <Icon src={img.back} onClick={() => historyPush('project')} alt='GoBackIcon' />
              {PAGES.map((pageName, i) => (
                <TextLink key={pageName} isSelected={isSelected(pageName)} onClick={() => historyPush(pageName)}>
                  {TABS[i]}
                </TextLink>
              ))}
            </>
          )}
          {!isInProject && <TextBox style={{ paddingLeft: '1rem' }}>My Projects</TextBox>}
        </HeaderContainer>
      )}
    </>
  );
};

export default Header;
