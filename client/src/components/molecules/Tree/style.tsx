import styled from '@emotion/styled';

interface IStyleProps {
  isRoot: boolean;
}

export const NodeContainer = styled.div<IStyleProps>`
  ${({ isRoot, theme }) => (isRoot ? theme.absoluteCenter : { position: 'relative' })};
  ${({ theme }) => theme.flex.row};
  align-items: center;
  gap: 1rem;
  width: fit-content;
`;

export const ChildContainer = styled.div`
  ${({ theme }) => theme.flex.column};
  gap: 1rem;
`;
