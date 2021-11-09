import styled from '@emotion/styled';
import { Levels, levelToIdx } from 'utils/helpers';

interface IProps {
  level: Levels;
  isSelected: boolean;
}

const Node = styled.p<IProps>`
  background-color: ${(props) => props.theme.nodeBgColors[levelToIdx(props.level)]};
  color: ${(props) => props.theme.nodeColors[levelToIdx(props.level)]};
  border-radius: 0.5rem;
  font-size: ${(props) => props.theme.nodeFontSizes[levelToIdx(props.level)]};
  line-height: ${(props) => props.theme.nodeFontSizes[levelToIdx(props.level)]};
  padding: 0.5rem 1rem;
  ${({ isSelected }) => (isSelected ? { border: '2px solid blue' } : {})}
`;

export default Node;
