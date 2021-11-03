import styled from '@emotion/styled';

enum NODE_TYPE {
  PROJECT,
  EPIC,
  STORY,
  TASK,
}

interface IProps {
  nodeType: 'PROJECT' | 'EPIC' | 'STORY' | 'TASK';
}

const Node = styled.div<IProps>`
  background-color: ${(props) => props.theme.nodeBgColors[NODE_TYPE[props.nodeType]]};
  color: ${(props) => props.theme.nodeColors[NODE_TYPE[props.nodeType]]};
  border: none;
  border-radius: 15px;
  text-align: center;
  height: 44px;
  font-size: ${(props) => props.theme.nodeFontSizes[NODE_TYPE[props.nodeType]]};
  position: absolute;
`;

export default Node;
