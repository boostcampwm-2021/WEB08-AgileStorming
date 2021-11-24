import styled from '@emotion/styled';
import { NodeTag } from 'components/atoms';

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

export const NodeDeleteBtn = styled(NodeTag)`
  background: ${({ theme }) => theme.color.primary2};
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  cursor: pointer;
`;
