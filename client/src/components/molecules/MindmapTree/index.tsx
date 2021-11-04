import React from 'react';
import styled from '@emotion/styled';
import { IMindmapData, IMindNodes } from 'recoil/mindmap';
import Node from 'components/atoms/Node';

interface IProps {
  mindmapData: IMindmapData;
}

interface ITreeProps {
  nodeId: number;
  mindNodes: IMindNodes;
}

interface IStyleProps {
  isRoot: boolean;
}

const NodeContainer = styled.div<IStyleProps>`
  ${(props) => props.isRoot && props.theme.absoluteCenter};
  ${(props) => props.theme.flex.row};
  align-items: center;
  gap: 1rem;
  border: 1px solid blue;
`;

const ChildContainer = styled.div`
  ${(props) => props.theme.flex.column};
  gap: 1rem;
`;

const Tree: React.FC<ITreeProps> = ({ nodeId, mindNodes }) => {
  const isRoot = nodeId === 0;
  const node = mindNodes.get(nodeId);
  const { level, content, children } = node!;
  const id = `${level}#${nodeId}`;
  return (
    <NodeContainer id={id} isRoot={isRoot} draggable='true'>
      <Node id={id} level={level}>
        {content}
      </Node>
      <ChildContainer>
        {children.map((childrenId) => (
          <Tree key={childrenId} nodeId={childrenId} mindNodes={mindNodes} />
        ))}
      </ChildContainer>
    </NodeContainer>
  );
};

const MindmapTree: React.FC<IProps> = ({ mindmapData }) => {
  const { rootId, mindNodes } = mindmapData;

  return <Tree key={rootId} nodeId={rootId} mindNodes={mindNodes} />;
};

export default MindmapTree;
