import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import Node from 'components/atoms/Node';
import { TCoord, TRect, getCurrentCoord, getGap, getType, calcRect } from 'utils/helpers';
import { Path } from '../../molecules';
import { IMindNodes, selectedNodeState } from 'recoil/mindmap';

interface ITreeProps {
  nodeId: number;
  mindNodes: IMindNodes;
  parentCoord: TCoord | null;
}

interface IStyleProps {
  isRoot: boolean;
}

const NodeContainer = styled.div<IStyleProps>`
  ${({ isRoot, theme }) => (isRoot ? theme.absoluteCenter : { position: 'relative' })};
  ${({ theme }) => theme.flex.center};
  gap: 1rem;
  border: 1px solid blue;
`;

const ChildContainer = styled.div`
  ${({ theme }) => theme.flex.column};
  gap: 1rem;
`;

const Tree: React.FC<ITreeProps> = ({ nodeId, mindNodes, parentCoord }) => {
  const isRoot = nodeId === 0;
  const node = mindNodes.get(nodeId);
  const { level, content, children } = node!;
  const id = `${level}#${nodeId}`;

  const selectedNodeId = useRecoilValue(selectedNodeState);
  let isSelected = selectedNodeId === id;

  const [coord, setCoord] = useState<TCoord | null>(null);
  const [rect, setRect] = useState<TRect | null>(null);
  const nodeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!nodeRef.current || !containerRef.current) return;

    const currentNode: HTMLElement = nodeRef.current;
    const currentContainer: HTMLElement = containerRef.current;

    const currentCoord = getCurrentCoord(currentNode);
    const gap = getGap(currentContainer);

    setCoord(currentCoord);

    if (!parentCoord || !currentCoord || !gap) return;
    const type = getType({ parentCoord, currentCoord, gap });

    setRect(calcRect({ parentCoord, currentCoord, gap, type }));
  }, [parentCoord]);

  return (
    <NodeContainer id={id + 'container'} ref={containerRef} isRoot={isRoot} draggable='true' className='mindmap-area'>
      <Node ref={nodeRef} id={id} level={level} isSelected={isSelected} className='node mindmap-area'>
        {content}
      </Node>
      <ChildContainer>
        {children.map((childrenId) => (
          <Tree key={childrenId} nodeId={childrenId} mindNodes={mindNodes} parentCoord={coord} />
        ))}
      </ChildContainer>
      {/* <Path rect={rect} /> */}
    </NodeContainer>
  );
};

export default Tree;
