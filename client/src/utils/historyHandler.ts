import { SetterOrUpdater } from 'recoil';
import { getNextMapState } from 'recoil/mindmap';
import { IMindmapData, IMindNode, IMindNodes } from 'types/mindmap';
import { IHistoryData } from 'types/history';
import { getChildLevel } from 'utils/helpers';
import { TAddNodeData, TDeleteNodeData, TMoveNodeData, TUpdateNodeParent, TUpdateNodeSibling, TUpdateTaskInformation } from 'types/event';

interface IParams {
  historyData: IHistoryData;
  isForward: boolean;
  setHistoryMapData: SetterOrUpdater<IMindmapData>;
  setHistoryDataList: SetterOrUpdater<IHistoryData[]>;
  historyDataList: IHistoryData[];
  historyMapData: IMindmapData;
}

export const restoreHistory = (params: IParams) => {
  const { historyData, isForward, setHistoryMapData, setHistoryDataList, historyDataList, historyMapData } = params;
  const historyMap = historyMapData.mindNodes;

  switch (historyData.type) {
    case 'ADD_NODE':
      if (isForward)
        addNode({
          historyData,
          historyMap,
        });
      else
        deleteNode({
          historyData,
          historyMap,
          setHistoryDataList,
          historyDataList,
        });

      break;
    case 'DELETE_NODE':
      if (isForward) deleteNode({ historyData, historyMap });
      else {
      }
      break;
    case 'MOVE_NODE':
      if (isForward) moveNode({ data: historyData.data.dataTo as TMoveNodeData, id: historyData.data.nodeFrom!, historyMap });
      else moveNode({ data: historyData.data.dataFrom as TMoveNodeData, id: historyData.data.nodeFrom!, historyMap });
      break;
    case 'UPDATE_NODE_CONTENT':
      updateNodeContent({
        historyData,
        historyMap,
        isForward,
      });

      break;
    case 'UPDATE_NODE_PARENT':
      if (isForward)
        updateNodeParent({
          from: historyData.data.nodeFrom!,
          to: historyData.data.nodeTo!,
          data: historyData.data.dataTo as TUpdateNodeParent,
          historyMap,
        });
      else
        updateNodeParent({
          from: historyData.data.nodeTo!,
          to: historyData.data.nodeFrom!,
          data: historyData.data.dataFrom as TUpdateNodeParent,
          historyMap,
        });
      break;
    case 'UPDATE_NODE_SIBLING':
      if (isForward) updateNodeSibling({ data: historyData.data.dataTo as TUpdateNodeSibling, historyMap });
      else updateNodeSibling({ data: historyData.data.dataFrom as TUpdateNodeSibling, historyMap });
      break;
    case 'UPDATE_TASK_INFORMATION':
      if (isForward)
        updateTaskInformation({ id: historyData.data.nodeFrom!, data: historyData.data.dataTo as TUpdateTaskInformation, historyMap });
      else updateTaskInformation({ id: historyData.data.nodeFrom!, data: historyData.data.dataFrom as TUpdateTaskInformation, historyMap });
      break;
  }

  const mapData = getNextMapState(historyMapData);

  setHistoryMapData(mapData);
};

interface IAddNodeParams {
  historyData: IHistoryData;
  historyMap: IMindNodes;
}

const addNode = ({ historyData, historyMap }: IAddNodeParams) => {
  const parentId = historyData.data.nodeFrom!;
  const parent = historyMap.get(parentId)!;
  const nodeId = historyData.data.dataTo
    ? (historyData.data.dataTo as TAddNodeData).nodeId!
    : (historyData.data.dataFrom as TDeleteNodeData).nodeId!;

  const { content } = historyData.data.dataTo as TAddNodeData;
  const newNode = historyData.data.dataTo
    ? { content, children: [], nodeId, level: getChildLevel(parent.level) }
    : { ...(historyData.data.dataFrom as TDeleteNodeData) };

  historyMap.set(parentId, { ...parent!, children: [...parent!.children, nodeId] });
  historyMap.set(nodeId, newNode as IMindNode);
};

interface IUpdateNodeContentParams {
  historyData: IHistoryData;
  historyMap: IMindNodes;
  isForward: boolean;
}

const updateNodeContent = ({ historyData, historyMap, isForward }: IUpdateNodeContentParams) => {
  const { nodeFrom: id, dataFrom, dataTo } = historyData.data;
  const node = historyMap.get(id!)!;

  historyMap.set(id!, { ...node, ...(isForward ? dataTo : dataFrom) });
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
  historyData: IHistoryData;
  historyMap: IMindNodes;
  setHistoryDataList?: SetterOrUpdater<IHistoryData[]>;
  historyDataList?: IHistoryData[];
}

const deleteNode = ({ historyData, historyMap, historyDataList, setHistoryDataList }: IDeleteNodeParams) => {
  const parentId = historyData.data.nodeFrom!;
  const parent = historyMap.get(parentId)!;

  const childId = historyData.data.dataFrom
    ? (historyData.data.dataFrom as TDeleteNodeData).nodeId
    : parent.children[parent.children.length - 1];
  const newChildren = historyData.data.dataFrom ? parent.children.filter((cid) => cid !== childId) : parent.children.slice(0, -1);

  historyMap.set(parentId, { ...parent, children: newChildren });
  if (historyData.data.dataTo && !(historyData.data.dataTo! as TAddNodeData).nodeId) {
    const newDataTo = { ...historyData.data.dataTo, nodeId: childId };
    const newHistory = { ...historyData!, data: { ...historyData.data, dataTo: newDataTo } };
    const newList = [...historyDataList!];
    const index = newList.findIndex((d) => d.historyId === newHistory.historyId);
    newList.splice(index, 1, newHistory as IHistoryData);
    setHistoryDataList!(newList);
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

const updateTaskInformation = ({ id, data, historyMap }: IUpdateNodeInformationParams) => {
  if (!data.changed.assigneeId) return;
  const node = historyMap.get(id)!;

  historyMap.set(id, { ...node, ...data.changed });
};
