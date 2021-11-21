import styled from '@emotion/styled';

export const Wrapper = styled.div`
  ${({ theme }) => theme.flex.row};
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  width: 100%;
  height: 40px;
`;
