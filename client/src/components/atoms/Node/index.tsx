import styled from '@emotion/styled';
import { TStatus } from 'types/event';
import { Levels, levelToIdx } from 'utils/helpers';

export interface INodeProps {
  level: Levels;
  isSelected: boolean;
  isFiltered?: boolean;
  status?: TStatus;
}

const styledStatus: { [key in TStatus]: string } = {
  'To Do': '',
  'In Progress': 'filter: brightness(1.2);',
  Done: 'background-color: #DADADA',
};

const Node = styled.div<INodeProps>`
  position: relative;
  ${({ theme }) => theme.flex.rowCenter};
  gap: 0.3rem;
  background-color: ${({ theme, level }) => theme.nodeBgColors[levelToIdx(level)]};
  color: ${({ theme, level }) => theme.nodeColors[levelToIdx(level)]};
  border-radius: 0.5rem;
  font-size: ${({ theme, level }) => theme.nodeFontSizes[levelToIdx(level)]};
  line-height: ${({ theme, level }) => theme.nodeFontSizes[levelToIdx(level)]};
  padding: 0.5rem 1rem;
  cursor: move;
  border: ${({ theme, isSelected }) => (isSelected ? `2px solid ${theme.color.primary2}` : '2px solid transparent')};
  ${({ status }) => (status ? styledStatus[status] : '')};
  ${({ isFiltered }) => !isFiltered && 'filter: brightness(0.7)'};
`;

export default Node;
