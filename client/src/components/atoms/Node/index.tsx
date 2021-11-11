import styled from '@emotion/styled';
import { Levels, levelToIdx } from 'utils/helpers';

interface IProps {
  level: Levels;
  isSelected: boolean;
}

const Node = styled.p<IProps>`
  background-color: ${({ theme, level }) => theme.nodeBgColors[levelToIdx(level)]};
  color: ${({ theme, level }) => theme.nodeColors[levelToIdx(level)]};
  border-radius: 0.5rem;
  font-size: ${({ theme, level }) => theme.nodeFontSizes[levelToIdx(level)]};
  line-height: ${({ theme, level }) => theme.nodeFontSizes[levelToIdx(level)]};
  padding: 0.5rem 1rem;
  border: ${({ isSelected }) => (isSelected ? '2px solid blue' : '2px solid transparent')};
`;

export default Node;
