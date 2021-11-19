import React from 'react';
import MindmapTree from 'components/organisms/MindmapTree';
import { getNextMapState } from 'recoil/mindmap';
import useHistoryEmitter from 'hooks/useHistoryEmitter';
import useDragEvent from 'hooks/useDragEvent';
import { getRegexNumber, levelToIdx } from 'utils/helpers';
import { THistoryEventData } from 'types/event';
import { IMindmapData, IMindNodes } from 'types/mindmap';

interface IProps {
  mindmapData: IMindmapData;
}

interface INodeInfo {
  depth: number;
  isFinished: boolean;
}

type INodeInfos = Map<number, INodeInfo>;

interface IChangeParentProps {
  curNodes: IMindNodes;
  nextNodes: IMindNodes;
  nodeInfos: INodeInfos;
  updateNodeParent: ({ nodeFrom, nodeTo, dataFrom, dataTo }: THistoryEventData) => void;
  draggedElem: HTMLElement;
  droppedElem: HTMLElement;
}

interface ICheckParentProps {
  [key: string]: number | null;
}

interface ICheckMoveProps {
  draggedDepth: number;
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

const checkMoveCondition = ({ draggedDepth, newParentLevelIdx }: ICheckMoveProps) => {
  const MAX_DEPTH = 3;
  const isOverDepth = draggedDepth + newParentLevelIdx > MAX_DEPTH;
  if (isOverDepth) return false;
  return true;
};

const changeNodeParent = ({ nextNodes, nodeInfos, updateNodeParent, draggedElem, droppedElem }: IChangeParentProps) => {
  const [draggedNodeNum, oldParentNodeNum] = [getNodeNum(draggedElem), getNodeNum(getParentElem(draggedElem))];
  const [newParentNodeNum, newAncestorNodeNum] = [getNodeNum(droppedElem), getNodeNum(getParentElem(droppedElem))];
  if (!checkParentConditon({ draggedNodeNum, oldParentNodeNum, newParentNodeNum, newAncestorNodeNum })) return;

  const [draggedNode, oldParentNode, newParentNode] = [draggedNodeNum, oldParentNodeNum, newParentNodeNum].map(
    (nodenum) => nextNodes.get(nodenum!)!
  );
  const [draggedLevel, newParentLevel] = [draggedNode, newParentNode].map((node) => node!.level);
  const newParentLevelIdx = levelToIdx(newParentLevel);
  const draggedDepth = nodeInfos.get(draggedNodeNum!)!.depth;
  if (!checkMoveCondition({ draggedDepth, newParentLevelIdx })) return;

  oldParentNode.children = oldParentNode.children.filter((childNodeNum) => childNodeNum !== draggedNodeNum);
  if (!newParentNode.children.includes(draggedNodeNum!)) newParentNode.children.push(draggedNodeNum!);

  const payload = {
    nodeFrom: oldParentNodeNum!,
    nodeTo: newParentNodeNum!,
    dataTo: {
      nodeId: draggedNodeNum,
      nodeType: draggedLevel,
      nodeParentType: newParentLevel,
    },
    dataFrom: {
      nodeId: draggedNodeNum,
      nodeType: draggedLevel,
      nodeParentType: oldParentNode.level,
    },
  } as THistoryEventData;

  updateNodeParent(payload);
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
  const { updateNodeParent } = useHistoryEmitter();
  const curNodes = mindmapData.mindNodes;
  const nextNodes = getNextMapState(mindmapData).mindNodes;
  const nodeInfos = getNodeInfo(new Map(), mindmapData.rootId, mindmapData.mindNodes);

  const handleDropNode = (event: React.MouseEvent, draggedElem: HTMLElement) => {
    event.preventDefault();
    const droppedElem = event.target as HTMLElement;
    changeNodeParent({ curNodes, nextNodes, nodeInfos, updateNodeParent, draggedElem, droppedElem });
  };
  useDragEvent({ drop: handleDropNode }, [], 'skyblue');

  return <MindmapTree mindmapData={mindmapData} />;
};

export default MindMap;
