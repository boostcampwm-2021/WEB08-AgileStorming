import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { IMindNode, IMindMap } from 'recoil/mindMap';
import Node from 'components/atoms/Node';

interface IProps {
  mindMap: IMindMap;
}

interface IStyleProps {
  isRoot: boolean;
}

interface ICoord {
  x: number;
  y: number;
}

interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
  type: QUATER_SPACE;
}

interface IGap {
  leftGap: number;
  topGap: number;
}

enum QUATER_SPACE {
  FIRST = 1,
  SECOND,
  THIRD,
  FOURTH,
}

const NodeContainer = styled.div<IStyleProps>`
  ${(props) => (props.isRoot ? props.theme.absoluteCenter : { position: 'relative' })};
  ${(props) => props.theme.flex.center};
  gap: 1rem;
  border: 1px solid blue;
`;

const ChildContainer = styled.div`
  ${(props) => props.theme.flex.column};
  gap: 1rem;
`;

const calcRect = (parentCoord: ICoord, childCoord: ICoord, gap: IGap, type: QUATER_SPACE): IRect => ({
  x: childCoord.x - Math.abs(childCoord.x + gap.leftGap - parentCoord.x),
  y: type === 1 ? childCoord.y : childCoord.y - Math.abs(childCoord.y + gap.topGap - parentCoord.y),
  width: Math.abs(childCoord.x + gap.leftGap - parentCoord.x),
  height: Math.abs(childCoord.y + gap.topGap - parentCoord.y),
  type: type,
});

const GetNodeContainer = (nodeId: number, mindNodes: Map<number, IMindNode>, parentCoord: ICoord | null) => {
  const isRoot = nodeId === 0;
  const node = mindNodes.get(nodeId);
  const { level, content, children } = node!;

  const [coord, setCoord] = useState<ICoord | null>(null);
  const [rect, setRect] = useState<IRect | null>(null);
  const nodeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!nodeRef.current || !containerRef.current) return;

    const currentNode: HTMLElement = nodeRef.current;
    const currentContainer: HTMLElement = containerRef.current;

    const currentRelativeCoord = {
      x: Math.floor(currentNode.offsetLeft + currentNode.offsetWidth / 2),
      y: Math.floor(currentNode.offsetTop + currentNode.offsetHeight / 2),
    };
    const currentGap = {
      topGap: Math.floor(currentContainer.offsetTop),
      leftGap: Math.floor(currentContainer.offsetLeft),
    };

    setCoord(currentRelativeCoord);

    if (!parentCoord || !currentRelativeCoord || !currentGap) return;
    const type = currentRelativeCoord.y + currentGap.topGap > parentCoord.y ? QUATER_SPACE.FOURTH : QUATER_SPACE.FIRST;
    setRect(calcRect(parentCoord, currentRelativeCoord, currentGap, type));
    console.log(
      rect &&
        'M' +
          (rect.type === 1 ? `${rect.x},${rect.y + rect.height}` : `${rect.x},${rect.y}`) +
          'L' +
          (rect.type === 1 ? `${rect.x + rect.width},${rect.y}` : `${rect.x + rect.width},${rect.y + rect.height}`)
    );
  }, [parentCoord]);

  return (
    <NodeContainer ref={containerRef} key={nodeId} isRoot={isRoot} draggable='true'>
      <Node ref={nodeRef} id={nodeId.toString()} level={level}>
        {content}
      </Node>
      {parentCoord && coord && rect ? (
        <svg
          width={rect.width}
          height={rect.height}
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          style={{
            position: 'absolute',
            strokeWidth: '0px',
            left: rect.x,
            top: rect.y,
            zIndex: -100,
          }}
        >
          <path
            fill='none'
            stroke='#000'
            d={
              'M' +
              (rect.type === 1 ? `0,${rect.height}` : `0,0`) +
              'Q' +
              (rect.type === 1 ? `0,0 ${rect.width},0` : `0,${rect.height} ${rect.width},${rect.height}`)
            }
            strokeWidth='1'
            strokeLinecap='round'
          ></path>
        </svg>
      ) : (
        ''
      )}
      <ChildContainer>{children.map((childrenId) => GetNodeContainer(childrenId, mindNodes, coord))}</ChildContainer>
    </NodeContainer>
  );
};

const MindMapTree: React.FC<IProps> = ({ mindMap }) => {
  const { rootId, mindNodes } = mindMap;

  return GetNodeContainer(rootId, mindNodes, null);
};

export default MindMapTree;
