import { SetterOrUpdater } from 'recoil';
import { getNextMapState } from 'recoil/mindmap';
import { IMindmapData, IMindNode, IMindNodes } from 'types/mindmap';
import { IHistoryData } from 'types/history';
import { getChildLevel } from 'utils/helpers';
import {
  TAddNodeData,
  TDeleteNodeData,
  TMoveNodeData,
  TUpdateNodeContent,
  TUpdateNodeParent,
  TUpdateNodeSibling,
  TUpdateTaskInformation,
} from 'types/event';

interface IParams {
  history: IHistoryData;
  isForward: boolean;
  setHistoryMapData: SetterOrUpdater<IMindmapData>;
  setHistoryData: SetterOrUpdater<IHistoryData[]>;
  historyData: IHistoryData[];
  historyMapData: IMindmapData;
}

export const restoreHistory = (params: IParams) => {
  const { history, isForward, setHistoryMapData, setHistoryData, historyData, historyMapData } = params;
  const historyMap = historyMapData.mindNodes;

  switch (history.type) {
    case 'ADD_NODE':
      if (isForward)
        addNode({
          history,
          historyMap,
        });
      else
        deleteNode({
          history,
          historyMap,
          setHistoryData,
          historyData,
        });

      break;
    case 'DELETE_NODE':
      if (isForward) deleteNode({ history, historyMap });
      else {
      }
      break;
    case 'MOVE_NODE':
      if (isForward) moveNode({ data: history.data.dataTo as TMoveNodeData, id: history.data.nodeFrom!, historyMap });
      else moveNode({ data: history.data.dataFrom as TMoveNodeData, id: history.data.nodeFrom!, historyMap });
      break;
    case 'UPDATE_NODE_CONTENT':
      if (isForward)
        updateNodeContent({
          id: history.data.nodeFrom!,
          content: (history.data.dataTo! as TUpdateNodeContent).content,
          historyMap,
        });
      else
        updateNodeContent({
          id: history.data.nodeTo!,
          content: (history.data.dataFrom! as TUpdateNodeContent).content,
          historyMap,
        });
      break;
    case 'UPDATE_NODE_PARENT':
      if (isForward)
        updateNodeParent({
          from: history.data.nodeFrom!,
          to: history.data.nodeTo!,
          data: history.data.dataTo as TUpdateNodeParent,
          historyMap,
        });
      else
        updateNodeParent({
          from: history.data.nodeTo!,
          to: history.data.nodeFrom!,
          data: history.data.dataFrom as TUpdateNodeParent,
          historyMap,
        });
      break;
    case 'UPDATE_NODE_SIBLING':
      if (isForward) updateNodeSibling({ data: history.data.dataTo as TUpdateNodeSibling, historyMap });
      else updateNodeSibling({ data: history.data.dataFrom as TUpdateNodeSibling, historyMap });
      break;
    case 'UPDATE_TASK_INFORMATION':
      if (isForward) updateNodeInformation({ id: history.data.nodeFrom!, data: history.data.dataTo as TUpdateTaskInformation, historyMap });
      else updateNodeInformation({ id: history.data.nodeFrom!, data: history.data.dataFrom as TUpdateTaskInformation, historyMap });
      break;
  }

  const mapData = getNextMapState(historyMapData);

  setHistoryMapData(mapData);
};

interface IAddNodeParams {
  history: IHistoryData;
  historyMap: IMindNodes;
}

const addNode = ({ history, historyMap }: IAddNodeParams) => {
  const parentId = history.data.nodeFrom!;
  const parent = historyMap.get(parentId)!;
  const nodeId = history.data.dataTo ? (history.data.dataTo as TAddNodeData).nodeId! : (history.data.dataFrom as TDeleteNodeData).nodeId!;

  const { content } = history.data.dataTo as TAddNodeData;
  const newNode = history.data.dataTo
    ? { content, children: [], nodeId, level: getChildLevel(parent.level) }
    : { ...(history.data.dataFrom as TDeleteNodeData) };
  console.log([...parent!.children, nodeId]);
  historyMap.set(parentId, { ...parent!, children: [...parent!.children, nodeId] });
  historyMap.set(nodeId, newNode as IMindNode);
};

interface IUpdateNodeContentParams {
  id: number;
  content: string;
  historyMap: IMindNodes;
}

const updateNodeContent = ({ id, content, historyMap }: IUpdateNodeContentParams) => {
  const node = historyMap.get(id);
  node!.content = content;

  historyMap.set(id, node!);
};

interface IMoveNodeParams {
  data: TMoveNodeData;
  id: number;
  historyMap: IMindNodes;
}

const moveNode = ({ data, id, historyMap }: IMoveNodeParams) => {
  const node = historyMap.get(id);
  node!.posX = data.posX;
  node!.posY = data.posY;

  historyMap.set(id, node!);
};

interface IDeleteNodeParams {
  history: IHistoryData;
  historyMap: IMindNodes;
  setHistoryData?: SetterOrUpdater<IHistoryData[]>;
  historyData?: IHistoryData[];
}

const deleteNode = ({ history, historyMap, historyData, setHistoryData }: IDeleteNodeParams) => {
  const parentId = history.data.nodeFrom!;
  const parent = historyMap.get(parentId)!;

  const childId = history.data.dataFrom ? (history.data.dataFrom as TDeleteNodeData).nodeId : parent.children[parent.children.length - 1];
  const newChildren = history.data.dataFrom ? parent.children.filter((cid) => cid !== childId) : parent.children.slice(0, -1);

  historyMap.set(parentId, { ...parent, children: newChildren });
  console.log(history.data);
  if (history.data.dataTo && !(history.data.dataTo! as TAddNodeData).nodeId) {
    const newDataTo = { ...history.data.dataTo, nodeId: childId };
    const newHistory = { ...history!, data: { ...history.data, dataTo: newDataTo } };
    const newList = [...historyData!];
    const index = newList.findIndex((d) => d.historyId === newHistory.historyId);
    console.log('-----', newDataTo);
    newList.splice(index - 1, 1, newHistory as IHistoryData);

    setHistoryData!(newList);
  }
};

interface IUpdateNodeParentParams {
  from: number;
  to: number;
  data: TUpdateNodeParent;
  historyMap: IMindNodes;
}

const updateNodeParent = ({ from, to, data, historyMap }: IUpdateNodeParentParams) => {
  const fromNode = historyMap.get(from)!;
  const toNode = historyMap.get(to)!;

  fromNode.children = fromNode.children.filter((childId) => childId !== data.nodeId);
  toNode.children = [...toNode.children, data.nodeId];

  historyMap.set(from, fromNode);
  historyMap.set(to, toNode);
};

interface IUpdateNodeSiblingParams {
  data: TUpdateNodeSibling;
  historyMap: IMindNodes;
}

const updateNodeSibling = ({ data, historyMap }: IUpdateNodeSiblingParams) => {
  const { parentId, children } = data;
  const parent = historyMap.get(parentId)!;

  parent.children = children;
  historyMap.set(parentId, parent);
};

interface IUpdateNodeInformationParams {
  id: number;
  data: TUpdateTaskInformation;
  historyMap: IMindNodes;
}

const updateNodeInformation = ({ id, data, historyMap }: IUpdateNodeInformationParams) => {
  const node = historyMap.get(id)!;

  historyMap.set(id, { ...node, ...data.changed });
};
