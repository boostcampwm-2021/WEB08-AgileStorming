import React from 'react';
import * as img from 'img';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import useProjectId from 'hooks/useRoomId';

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

const BoxLink = styled.div`
  all: unset;
  cursor: pointer;
  color: ${(props) => props.theme.color.white};
`;

const Header: React.FC<IProps> = ({ children }: IProps) => {
  const history = useHistory();
  const projectId = useProjectId();

  const handleLinkClick = (link: any) => {
    history.push(link + projectId);
  };

  return (
    <>
      <HeaderContainer>
        <BackIcon src={img.back} onClick={() => history.push('/project')} alt='IconImgNoHoverStyle' />
        <BoxLink onClick={handleLinkClick.bind(null, '/mindmap/')}>마인드맵</BoxLink>
        <BoxLink onClick={handleLinkClick.bind(null, '/kanban/')}>칸반보드</BoxLink>
        <BoxLink onClick={handleLinkClick.bind(null, '/calendar/')}>캘린더</BoxLink>
        <BoxLink onClick={handleLinkClick.bind(null, '/chart/')}>차트</BoxLink>
        <BoxLink onClick={handleLinkClick.bind(null, '/backlog/')}>백로그</BoxLink>
      </HeaderContainer>
      {children}
    </>
  );
};

export default Header;
