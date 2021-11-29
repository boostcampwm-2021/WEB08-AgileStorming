import styled from '@emotion/styled';

const Icon = styled.img`
  width: 2rem;
  height: 2rem;
  padding: ${(props) => props.theme.padding.normal};
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  height: ${(props) => props.theme.HEADER_HEIGHT};
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

const TextBox = styled.div`
  color: ${(props) => props.theme.color.white};
  padding-bottom: 0.1rem;
  ${(props) => props.theme.flex.row};
  align-items: center;
  cursor: default;
`;

interface Textlink {
  isSelected: boolean;
}

const TextLink = styled(TextBox)<Textlink>`
  height: 1.3rem;
  cursor: pointer;
  border-bottom: 0.1rem solid ${({ isSelected, theme }) => (isSelected ? theme.color.white : 'transparent')};
`;

const LogoutBtn = styled(TextBox)`
  margin-left: auto;
  padding-right: 2rem;
  cursor: pointer;
`;

export { Icon, HeaderContainer, TextBox, TextLink, LogoutBtn };
