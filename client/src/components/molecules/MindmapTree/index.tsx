import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { IMindmapData, IMindNodes, selectedNodeState } from 'recoil/mindmap';
import Node from 'components/atoms/Node';
import { useRecoilValue } from 'recoil';

interface IProps {
  mindmapData: IMindmapData;
}

interface ITreeProps {
  nodeId: number;
  mindNodes: IMindNodes;
  parentCoord: ICoord | null;
}

interface IStyleProps {
  isRoot: boolean;
}

interface ICoord {
  x: number;
  y: number;
}

interface IRect extends ICoord {
  width: number;
  height: number;
  type: QUATER_SPACE;
}

interface IGap {
  leftGap: number;
  topGap: number;
}

interface ICalcRectProps {
  parentCoord: ICoord;
  currentCoord: ICoord;
  gap: IGap;
  type: QUATER_SPACE;
}

enum QUATER_SPACE {
  FIRST = 1,
  SECOND,
  THIRD,
  FOURTH,
}

const Svg = styled.svg<ISvgProps>`
  position: 'absolute';
  stroke-width: '0px';
  left: ${({ rect }) => rect.x};
  top: ${({ rect }) => rect.y};
  width: ${({ rect }) => rect.width};
  height: ${({ rect }) => rect.height};
  overflow: 'hidden';
  z-index: -100;
`;

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

const calcRect = ({ parentCoord, currentCoord, gap, type }: ICalcRectProps): IRect => ({
  x: currentCoord.x - Math.abs(currentCoord.x + gap.leftGap - parentCoord.x),
  y: type === 1 ? currentCoord.y : currentCoord.y - Math.abs(currentCoord.y + gap.topGap - parentCoord.y),
  width: Math.abs(currentCoord.x + gap.leftGap - parentCoord.x),
  height: Math.abs(currentCoord.y + gap.topGap - parentCoord.y),
  type: type,
});

const Tree: React.FC<ITreeProps> = ({ nodeId, mindNodes, parentCoord }) => {
  const isRoot = nodeId === 0;
  const node = mindNodes.get(nodeId);
  const { level, content, children } = node!;
  const id = `${level}#${nodeId}`;

  const selectedNodeId = useRecoilValue(selectedNodeState);
  let isSelected = selectedNodeId === id;

  const [coord, setCoord] = useState<ICoord | null>(null);
  const [rect, setRect] = useState<IRect | null>(null);
  const nodeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!nodeRef.current || !containerRef.current) return;

    const currentNode: HTMLElement = nodeRef.current;
    const currentContainer: HTMLElement = containerRef.current;

    const currentCoord = {
      x: Math.floor(currentNode.offsetLeft + currentNode.offsetWidth / 2),
      y: Math.floor(currentNode.offsetTop + currentNode.offsetHeight / 2),
    };
    const gap = {
      topGap: Math.floor(currentContainer.offsetTop),
      leftGap: Math.floor(currentContainer.offsetLeft),
    };

    setCoord(currentCoord);

    if (!parentCoord || !currentCoord || !gap) return;
    const type = currentCoord.y + gap.topGap > parentCoord.y ? QUATER_SPACE.FOURTH : QUATER_SPACE.FIRST;
    setRect(calcRect({ parentCoord, currentCoord, gap, type }));
  }, [parentCoord]);

  return (
    <NodeContainer id={id + 'container'} ref={containerRef} isRoot={isRoot} draggable='true' className='mindmap-area'>
      <Node ref={nodeRef} id={id} level={level} isSelected={isSelected} className='node mindmap-area'>
        {content}
      </Node>
      {/* {parentCoord && coord && rect ? (
        <Svg rect={rect} xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
          <rect width='100%' height='100%' fill='red' opacity='0.2' />
          <path fill='none' stroke='#000' d={getDrawShape(rect)} strokeWidth='1' strokeLinecap='round'></path>
        </Svg>
      ) : (
        ''
      )} */}
      <ChildContainer>
        {children.map((childrenId) => (
          <Tree key={childrenId} nodeId={childrenId} mindNodes={mindNodes} parentCoord={coord} />
        ))}
      </ChildContainer>
    </NodeContainer>
  );
};

const MindmapTree: React.FC<IProps> = ({ mindmapData }) => {
  const { rootId, mindNodes } = mindmapData;

  return <Tree key={rootId} nodeId={rootId} mindNodes={mindNodes} parentCoord={null} />;
};

interface ISvgProps {
  rect: IRect;
}

const getDrawShape = (rect: IRect): string =>
  'M' +
  (rect.type === 1 ? `0,${rect.height}` : `0,0`) +
  'Q' +
  (rect.type === 1 ? `0,0 ${rect.width},0` : `0,${rect.height} ${rect.width},${rect.height}`);

export default MindmapTree;
