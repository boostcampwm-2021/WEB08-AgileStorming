import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Node from 'components/atoms/Node';
import { TCoord, TRect, getCurrentCoord, getGap, getType, calcRect } from 'utils/helpers';
import { Path } from '../../molecules';
import { getNextMapState, IMindmapData, mindmapState } from 'recoil/mindmap';
import { selectedNodeIdState } from 'recoil/node';
import { Input } from 'components/atoms';
import { NodeContainer, ChildContainer } from './style';

interface ITreeProps {
  nodeId: number;
  mindmapData: IMindmapData;
  parentCoord: TCoord | null;
  parentId?: number;
}

const Tree: React.FC<ITreeProps> = ({ nodeId, mindmapData, parentCoord, parentId }) => {
  const isRoot = nodeId === 0;
  const { rootId, mindNodes } = mindmapData;
  const node = mindNodes.get(nodeId);
  const { level, content, children } = node!;

  const setMindmapData = useSetRecoilState(mindmapState);

  const selectedNodeId = useRecoilValue(selectedNodeIdState);
  let isSelected = selectedNodeId === nodeId;

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
  }, [parentCoord, mindNodes]);

  const removeEmptyTempNode = (content: string) => {
    if (content) return false;

    const parent = mindNodes.get(parentId!);
    parent!.children = parent!.children.filter((childId) => childId !== nodeId);
    mindNodes.set(parentId!, parent!);
    mindNodes.delete(nodeId);
    const newMapData = getNextMapState({ rootId, mindNodes });
    setMindmapData(newMapData);

    return true;
  };

  const makeNewNode = () => {};

  const handleNodeContentFocusout = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    const content = currentTarget.value;

    if (removeIfEmptyTempNode(content)) return;
    makeNewNode();
  };

  const handleNodeContentEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const content = event.currentTarget.value;

    if (removeIfEmptyTempNode(content)) return;
    makeNewNode();
  };

  return (
    <NodeContainer id={nodeId + 'container'} ref={containerRef} isRoot={isRoot} draggable='true' className='mindmap-area'>
      <Node ref={nodeRef} id={nodeId.toString()} level={level} isSelected={isSelected} className='node mindmap-area'>
        {nodeId === -1 ? (
          <Input inputStyle='small' autoFocus onBlur={handleNodeContentFocusout} onKeyPress={handleNodeContentEnter} />
        ) : null}
        {content}
      </Node>
      <ChildContainer>
        {children.map((childrenId) => (
          <Tree key={childrenId} nodeId={childrenId} mindmapData={mindmapData} parentCoord={coord} parentId={nodeId} />
        ))}
      </ChildContainer>
      <Path rect={rect} />
    </NodeContainer>
  );
};

export default Tree;
