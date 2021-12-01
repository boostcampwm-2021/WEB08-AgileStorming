import { THistoryEventData } from 'types/event';
import { IMindmapData, IMindNode, IMindNodes } from 'types/mindmap';

interface ICoord {
  x: number;
  y: number;
}

interface IRect extends ICoord {
  width: number;
  height: number;
  type: QuarterSpace;
}

interface IGetTypeParams {
  parentCoord: TCoord;
  currentCoord: TCoord;
  gap: IGap;
}

interface IGap {
  leftGap: number;
  topGap: number;
}

interface ICalcRectParams {
  parentCoord: TCoord;
  currentCoord: TCoord;
  gap: TGap;
  type: QuarterSpace;
}

enum QuarterSpace {
  FIRST = 1,
  SECOND,
  THIRD,
  FOURTH,
}

const pxToNum = (px: string): number => Number(px.slice(0, -2));
const numToPx = (num: number): string => num + 'px';

const getRegexNumber = (nodeId: string) => {
  return Number(nodeId.replace(/[^0-9]/g, ''));
};

const getId = (nodeId: string): number => {
  const splitId = nodeId.split('#');
  return Number(splitId[1]);
};

export type Levels = 'ROOT' | 'EPIC' | 'STORY' | 'TASK';
type DictType = { [index: number]: string };
const LEVEL_DICT: DictType = { 0: 'ROOT', 1: 'EPIC', 2: 'STORY', 3: 'TASK' };
const idxToLevel = (idx: number) => LEVEL_DICT[idx] as Levels;
const levelToIdx = (level: string) => Object.values(LEVEL_DICT).findIndex((v) => level === v);

const getDrawShape = (rect: IRect): string =>
  'M' +
  (rect.type === 1 ? `0,${rect.height}` : `0,0`) +
  'Q' +
  (rect.type === 1 ? `0,0 ${rect.width},0` : `0,${rect.height} ${rect.width},${rect.height}`);

const getCurrentCoord = (currentNode: HTMLElement) => ({
  x: Math.floor(currentNode.offsetLeft + currentNode.offsetWidth / 2),
  y: Math.floor(currentNode.offsetTop + currentNode.offsetHeight / 2),
});

const getGap = (currentContainer: HTMLElement) => ({
  topGap: Math.floor(currentContainer.offsetTop),
  leftGap: Math.floor(currentContainer.offsetLeft),
});

const getType = ({ currentCoord, gap, parentCoord }: IGetTypeParams) =>
  currentCoord.y + gap.topGap > parentCoord.y ? QuarterSpace.FOURTH : QuarterSpace.FIRST;

const calcRect = ({ parentCoord, currentCoord, gap, type }: ICalcRectParams): IRect => ({
  x: currentCoord.x - Math.abs(currentCoord.x + gap.leftGap - parentCoord.x),
  y: type === 1 ? currentCoord.y : currentCoord.y - Math.abs(currentCoord.y + gap.topGap - parentCoord.y),
  width: Math.abs(currentCoord.x + gap.leftGap - parentCoord.x),
  height: Math.max(Math.abs(currentCoord.y + gap.topGap - parentCoord.y), 3),
  type: type,
});

const getNewNode = (id: number, level: Levels, content: string) => ({
  nodeId: id,
  backlogId: '',
  level: level,
  content: content,
  children: [],
  label: [],
  sprint: null,
  assignee: null,
  createdAt: new Date().toISOString(),
  priority: null,
  dueDate: null,
  estimatedTime: null,
  finishedTime: null,
  comment: [],
});

const fillPayload = (payload: THistoryEventData): THistoryEventData => ({
  nodeFrom: null,
  nodeTo: null,
  dataFrom: null,
  dataTo: null,
  ...payload,
});

const getChildLevel = (level: Levels): Levels => idxToLevel(levelToIdx(level) + 1);

const setTreeLevel = (mindNodes: IMindNodes, nodeId: number, depth: number) => {
  const node = mindNodes.get(nodeId)!;
  node.level = idxToLevel(depth);
  node.children.forEach((childId) => setTreeLevel(mindNodes, childId, depth + 1));
};

const getAllChildren = (node: IMindNode, mindmapData: IMindmapData) => {
  const allChildren: Array<IMindNode> = [];
  node.children.forEach((childId) => {
    const childNode = mindmapData.mindNodes.get(childId)!;
    allChildren.push(childNode);
    childNode?.children.forEach((grandChildId) => {
      const grandChildNode = mindmapData.mindNodes.get(grandChildId)!;
      allChildren.push(grandChildNode);
    });
  });
  return allChildren;
};

const PAGES = ['mindmap', 'kanban', 'calendar', 'chart', 'backlog'];

export {
  getChildLevel,
  fillPayload,
  getNewNode,
  calcRect,
  getType,
  getGap,
  getCurrentCoord,
  QuarterSpace as QUARTER_SPACE,
  getDrawShape,
  getId,
  pxToNum,
  numToPx,
  getRegexNumber,
  idxToLevel,
  levelToIdx,
  setTreeLevel,
  getAllChildren,
  PAGES,
};
export type TRect = IRect;
export type TCoord = ICoord;
export type TGap = IGap;
