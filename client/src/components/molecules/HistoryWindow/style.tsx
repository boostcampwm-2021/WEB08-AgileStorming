import styled from '@emotion/styled';

interface IProps {
  isSelected: boolean;
}

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.bgWhite};
  width: 100%;
  height: 80px;
  ${({ theme }) => theme.flex.row}
  overflow-y: hidden;
  overflow-x: scroll;
  ${({ theme }) => theme.customScrollbar.primary1}
  gap: 1rem;
  align-items: center;
  font-size: 2rem;
  position: relative;
  border-radius: 0.5rem;
`;

export const IconWrapper = styled.div<IProps>`
  ${({ isSelected, theme }) => (isSelected ? { backgroundColor: theme.color.primary1 } : { border: 'none' })};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;
