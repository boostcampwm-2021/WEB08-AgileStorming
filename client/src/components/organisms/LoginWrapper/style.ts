import styled from '@emotion/styled';

export const Wrapper = styled.div`
  ${({ theme }) => theme.absoluteCenter};
  ${({ theme }) => theme.flex.columnCenter};
  width: 300px;
`;
