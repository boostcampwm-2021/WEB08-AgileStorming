import React from 'react';
import MindmapTree from 'components/organisms/MindmapTree';
import { IMindmapData, getNextMapState, IMindNodes } from 'recoil/mindmap';
import useSocketEmitter, { ISocketEmitter } from 'hooks/useSocketEmit';
import useDragEvent from 'hooks/useDragEvent';
import { getRegexNumber, idxToLevel, levelToIdx } from 'utils/helpers';

interface IProps {
  mindmapData: IMindmapData;
}

interface INodeInfo {
  depth: number;
  isFinished: boolean;
}

type INodeInfos = Map<number, INodeInfo>;

interface IChangeParentProps {
  nextMapData: IMindmapData;
  nodeInfos: INodeInfos;
  socketEmitter: ISocketEmitter;
  draggedElem: HTMLElement;
  droppedElem: HTMLElement;
}

interface ICheckParentProps {
  [key: string]: number | null;
}

interface ICheckMoveProps {
  draggedDepth: number;
  draggedLevel: string;
  newParentLevel: string;
  oldParentLevelIdx: number;
  newParentLevelIdx: number;
}

const getNodeNum = (element: HTMLElement) => {
  if (!element?.id) return null;
  return getRegexNumber(element.id);
};

const getParentElem = (element: HTMLElement) => {
  const container = element?.parentNode;
  const parentNode = container?.parentNode;
  return (parentNode as HTMLElement) ?? null;
};

const checkParentConditon = ({ draggedNodeNum, oldParentNodeNum, newParentNodeNum, newAncestorNodeNum }: ICheckParentProps) => {
  const isParentsNotExist = oldParentNodeNum === null || newParentNodeNum === null;
  const isSameParent = newParentNodeNum === draggedNodeNum || newParentNodeNum === oldParentNodeNum;
  const isChildNodeSelected = draggedNodeNum === newAncestorNodeNum;
  if (isParentsNotExist || isSameParent || isChildNodeSelected) return false;
  return true;
};

const checkMoveCondition = ({ draggedDepth, draggedLevel, newParentLevel, oldParentLevelIdx, newParentLevelIdx }: ICheckMoveProps) => {
  const MAX_DEPTH = 3;
  const isMoveTaskeUpperLevel = draggedLevel === 'TASK' && newParentLevel !== 'STORY';
  const isMoveParentOfTask = draggedDepth + oldParentLevelIdx === MAX_DEPTH && draggedDepth + newParentLevelIdx !== MAX_DEPTH;
  const isOverDepth = draggedDepth + newParentLevelIdx > MAX_DEPTH;
  if (isMoveTaskeUpperLevel || isMoveParentOfTask || isOverDepth) return false;
  return true;
};

const changeNodeParent = ({ nextMapData, nodeInfos, socketEmitter, draggedElem, droppedElem }: IChangeParentProps) => {
  const nextMapNodes = nextMapData.mindNodes;
  const [draggedNodeNum, oldParentNodeNum] = [getNodeNum(draggedElem), getNodeNum(getParentElem(draggedElem))];
  const [newParentNodeNum, newAncestorNodeNum] = [getNodeNum(droppedElem), getNodeNum(getParentElem(droppedElem))];
  if (!checkParentConditon({ draggedNodeNum, oldParentNodeNum, newParentNodeNum, newAncestorNodeNum })) return;

  const [draggedNode, oldParentNode, newParentNode] = [draggedNodeNum, oldParentNodeNum, newParentNodeNum].map(
    (nodenum) => nextMapNodes.get(nodenum!)!
  );
  const [draggedLevel, oldParentLevel, newParentLevel] = [draggedNode, oldParentNode, newParentNode].map((node) => node!.level);
  const [draggedLevelIdx, oldParentLevelIdx, newParentLevelIdx] = [draggedLevel, oldParentLevel, newParentLevel].map((level) =>
    levelToIdx(level)
  );
  const draggedDepth = nodeInfos.get(draggedNodeNum!)!.depth;
  if (!checkMoveCondition({ draggedDepth, draggedLevel, newParentLevel, oldParentLevelIdx, newParentLevelIdx })) return;

  oldParentNode.children = oldParentNode.children.filter((childNodeNum) => childNodeNum !== draggedNodeNum);
  newParentNode.children.push(draggedNodeNum!);
  const isLevelChanged = newParentLevelIdx + 1 !== draggedLevelIdx;
  if (isLevelChanged) {
    draggedNode.level = idxToLevel(newParentLevelIdx + 1);
    draggedNode.children.forEach((childId) => {
      const childLevel = idxToLevel(newParentLevelIdx + 2);
      nextMapNodes.get(childId)!.level = childLevel;
    });
  }

  const history = {
    oldNode: oldParentNode,
    newNode: newParentNode,
  };
  socketEmitter({ eventName: 'change', history: history, nextState: nextMapData });
};

const getNodeInfo = (nodeInfos: INodeInfos, nodeId: number, mindNodes: IMindNodes) => {
  const node = mindNodes.get(nodeId)!;
  let [maxChildDepth, finishedChildNum] = [0, 0];
  node?.children.forEach((childId) => {
    getNodeInfo(nodeInfos, childId, mindNodes);
    const { depth, isFinished } = nodeInfos.get(childId)!;
    maxChildDepth = Math.max(maxChildDepth, depth);
    finishedChildNum += Number(isFinished);
  });
  nodeInfos.set(nodeId, { depth: maxChildDepth + 1, isFinished: node.children.length === finishedChildNum });
  return nodeInfos;
};

const MindMap: React.FC<IProps> = ({ mindmapData }) => {
  const socketEmitter = useSocketEmitter();
  const nextMapData = getNextMapState(mindmapData);
  const nodeInfos = getNodeInfo(new Map(), mindmapData.rootId, mindmapData.mindNodes);

  const handleDropNode = (event: React.MouseEvent, draggedElem: HTMLElement) => {
    event.preventDefault();
    const droppedElem = event.target as HTMLElement;
    changeNodeParent({ nextMapData, nodeInfos, socketEmitter, draggedElem, droppedElem });
  };
  useDragEvent({ drop: handleDropNode }, ['EPIC', 'STORY', 'ROOT', 'TASK'], 'skyblue');

  return <MindmapTree mindmapData={mindmapData} />;
};

export default MindMap;

// <정렬 로직>
// 각 노드 자식 수, 완료 정보 계산 (O)
// 자신의 자식으로 못 간다. (O)
// 깊이가 3을 넘으면 자식으로 못간다. (O)
// Task가 있는 노드는 이동 후에 깊이 3일때만 이동 가능 (O)
// 자식끼리 순서 변경 -> y pos 값 필요

// <컴포넌트>
// event 적용 (O)
// useMemo 적용
// 코드 분리 및 리팩토링
