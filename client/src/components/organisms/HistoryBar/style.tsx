import styled from '@emotion/styled';

export const Wrapper = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  position: fixed;
  background-color: ${({ theme }) => theme.color.gray1};
  width: 100vw;
  height: 160px;
  bottom: 0;
  padding: 0 2rem;
`;
