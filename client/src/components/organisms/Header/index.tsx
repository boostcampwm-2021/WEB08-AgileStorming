import React from 'react';
import * as img from 'img';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import useProjectId from 'hooks/useRoomId';
import { useRecoilState } from 'recoil';
import { urlLocationState } from 'recoil/project';

interface IProps {
  children?: React.ReactNode;
}
const BackIcon = styled.img`
  padding: ${(props) => props.theme.padding.normal};
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  ${(props) => props.theme.flex.row};
  align-items: center;
  gap: 0.5rem;
  background-color: ${(props) => props.theme.color.primary1};
`;

interface IBoxlink {
  isSelected: boolean;
}
const BoxLink = styled.div<IBoxlink>`
  all: unset;
  cursor: pointer;
  color: ${(props) => props.theme.color.white};
  padding-bottom: 0.1rem;
  border-bottom: 0.1rem solid ${({ isSelected, theme }) => (isSelected ? theme.color.white : 'transparent')};
`;

const PAGES = ['/mindmap/', '/kanban/', '/calendar/', '/chart/', '/backlog/'];
const TABS = ['마인드맵', '칸반보드', '캘린더', '차트', '백로그'];

const Header: React.FC<IProps> = ({ children }: IProps) => {
  const history = useHistory();
  const projectId = useProjectId();
  const [urlLocation, setUrlLocation] = useRecoilState(urlLocationState);

  const handleLinkClick = (link: string) => {
    setUrlLocation(link);
    history.push(link + projectId);
  };

  const isSelected = (link: string) => link === urlLocation;

  return (
    <>
      <HeaderContainer>
        <BackIcon src={img.back} onClick={() => history.push('/project')} alt='IconImgNoHoverStyle' />
        {PAGES.map((pageName, i) => (
          <BoxLink key={pageName} isSelected={isSelected(pageName)} onClick={handleLinkClick.bind(null, pageName)}>
            {TABS[i]}
          </BoxLink>
        ))}
      </HeaderContainer>
      {children}
    </>
  );
};

export default Header;
