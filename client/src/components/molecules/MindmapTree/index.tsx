import React from 'react';
import styled from '@emotion/styled';
import { IMindNode, IMindMap } from 'recoil/mindMap';
import { css } from '@emotion/react';

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

interface IRoot {
  isRoot: boolean;
}

const NodeContainer = styled.div<IRoot>`
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid blue;
  ${(props) =>
    props.isRoot &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
    `}
`;

const ChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const getNodeContainer = (nodeId: number, mindNodes: Map<number, IMindNode>) => {
  const isRoot = nodeId === 0;
  const node = mindNodes.get(nodeId);
  const { level, content, children } = node!;
  return (
    <>
      <NodeContainer key={nodeId} isRoot={isRoot}>
        <Node nodeId={nodeId} level={level}>
          {content}
        </Node>
        <ChildContainer>{children.map((childrenId) => getNodeContainer(childrenId, mindNodes))}</ChildContainer>
      </NodeContainer>
    </>
  );
};

const MindMapTree: React.FC<IProps> = ({ mindMap }) => {
  const { rootId, mindNodes } = mindMap;
  return getNodeContainer(rootId, mindNodes);
};

export default MindMapTree;
