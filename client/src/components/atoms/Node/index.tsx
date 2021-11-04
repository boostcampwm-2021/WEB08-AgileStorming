import styled from '@emotion/styled';
import { levels } from 'recoil/mindmap';

enum LEVEL {
  ROOT,
  EPIC,
  STORY,
  TASK,
}

interface IProps {
  level: levels;
}

const Node = styled.p<IProps>`
  background-color: ${(props) => props.theme.nodeBgColors[LEVEL[props.level as levels]]};
  color: ${(props) => props.theme.nodeColors[LEVEL[props.level as levels]]};
  border-radius: 0.5rem;
  font-size: ${(props) => props.theme.nodeFontSizes[LEVEL[props.level as levels]]};
  line-height: ${(props) => props.theme.nodeFontSizes[LEVEL[props.level as levels]]};
  padding: 0.5rem 1rem;
`;

export default Node;
