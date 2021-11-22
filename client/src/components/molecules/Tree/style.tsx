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

export const NodeDeleteBtn = styled.div`
  color: ${(props) => props.theme.color.white};
  background: blue;
  font-size: ${(props) => props.theme.fontSize.small};
  border-radius: 1rem;
  padding: 0.2rem;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  cursor: pointer;
`;
