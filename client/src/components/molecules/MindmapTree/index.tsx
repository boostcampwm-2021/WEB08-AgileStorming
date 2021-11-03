import React from 'react';
import styled from '@emotion/styled';
import { IMindNode, IMindMap } from 'recoil/mindMap';

///분업을 위한 임시 지정 삭제예정
interface INodeProps {
  nodeId: number;
  level: string;
}

const Node = styled.div<INodeProps>`
  width: 5rem;
  height: 2.5rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.level === 'epic' ? 'red' : props.level === 'story' ? 'yellow' : props.level === 'task' ? 'skyblue' : 'purple'};
`;
///분업을 위한 임시 지정 삭제예정

interface IProps {
  mindMap: IMindMap;
}

interface IStyleProps {
  isRoot: boolean;
}

const NodeContainer = styled.div<IStyleProps>`
  ${(props) => props.theme.flex.center};
  ${(props) => props.isRoot && props.theme.absoluteCenter};
  gap: 1rem;
  border: 1px solid blue;
`;

const ChildContainer = styled.div`
  ${(props) => props.theme.flex.column};
  gap: 1rem;
`;

const getNodeContainer = (nodeId: number, mindNodes: Map<number, IMindNode>) => {
  const isRoot = nodeId === 0;
  const node = mindNodes.get(nodeId);
  const { level, content, children } = node!;
  return (
    <NodeContainer key={nodeId} isRoot={isRoot} draggable='true'>
      <Node nodeId={nodeId} level={level}>
        {content}
      </Node>
      <ChildContainer>{children.map((childrenId) => getNodeContainer(childrenId, mindNodes))}</ChildContainer>
    </NodeContainer>
  );
};

const MindMapTree: React.FC<IProps> = ({ mindMap }) => {
  const { rootId, mindNodes } = mindMap;

  return getNodeContainer(rootId, mindNodes);
};

export default MindMapTree;
