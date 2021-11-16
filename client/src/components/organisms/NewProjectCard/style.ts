import styled from '@emotion/styled';

export const StyledNewProjectCard = styled.button`
  ${(props) => props.theme.flex.center}
  width: 320px;
  height: 300px;
  background: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray3};
  border-radius: 5px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  margin: 10px;
  :hover {
    cursor: pointer;
    background: ${(props) => props.theme.color.bgWhite};
  }
`;
