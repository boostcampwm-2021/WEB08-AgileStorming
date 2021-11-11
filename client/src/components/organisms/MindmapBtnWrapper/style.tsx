import styled from '@emotion/styled';

export const Wrapper = styled.div`
  ${({ theme }) => theme.flex.row}
  align-items: center;
  position: fixed;
  bottom: 50px;
  left: 50px;
  gap: 1rem;
`;
