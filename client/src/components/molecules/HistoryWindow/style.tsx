import styled from '@emotion/styled';

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.bgWhite};
  width: 100%;
  height: 70px;
  ${({ theme }) => theme.flex.row}
  overflow: scroll;
  gap: 1rem;
  align-items: center;
`;

export const IconWrapper = styled.div`
  background-color: ${({ color }) => color};
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
