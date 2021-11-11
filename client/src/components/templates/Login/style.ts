import styled from '@emotion/styled';

export const Template = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2rem;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.primary1};
  ${(props) => props.theme.flex.columnCenter}
`;

export const Wrapper = styled.div`
  ${({ theme }) => theme.absoluteCenter};
  ${({ theme }) => theme.flex.columnCenter};
  width: 300px;
`;
