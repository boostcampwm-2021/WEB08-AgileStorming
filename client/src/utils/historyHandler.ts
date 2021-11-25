import { SetterOrUpdater } from 'recoil';
import { getNextMapState } from 'recoil/mindmap';
import { IMindmapData, IMindNode, IMindNodes } from 'types/mindmap';
import { IHistoryData } from 'types/history';
import { TAddNodeData, TDeleteNodeData, TUpdateNodeParent, TUpdateTaskInformation } from 'types/event';

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
  const { nodeFrom, dataFrom, dataTo } = historyData.data;

  switch (historyData.type) {
    case 'ADD_NODE':
      if (isForward) addNode({ historyMap, parentId: nodeFrom!, dataFrom: dataFrom as TDeleteNodeData, dataTo: dataTo as IMindNode });
      else deleteNode({ historyData, historyMap, setHistoryDataList, historyDataList });
      break;
    case 'DELETE_NODE':
      if (isForward) deleteNode({ historyData, historyMap });
      else addNode({ historyMap, parentId: nodeFrom!, dataFrom: dataFrom as TDeleteNodeData, dataTo: dataTo as IMindNode });
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
    case 'UPDATE_TASK_INFORMATION':
      if (isForward)
        updateTaskInformation({ id: historyData.data.nodeFrom!, data: historyData.data.dataTo as TUpdateTaskInformation, historyMap });
      else updateTaskInformation({ id: historyData.data.nodeFrom!, data: historyData.data.dataFrom as TUpdateTaskInformation, historyMap });
      break;
    default:
      return;
  }

  const mapData = getNextMapState(historyMapData);
  setHistoryMapData(mapData);
};

interface IAddNodeParams {
  parentId: number;
  historyMap: IMindNodes;
  dataTo: TAddNodeData;
  dataFrom: TDeleteNodeData;
}

const addNode = ({ historyMap, parentId, dataTo, dataFrom }: IAddNodeParams) => {
  const parent = historyMap.get(parentId)!;
  const { nodeId } = dataTo ?? dataFrom;

  const newNode = dataFrom ? { ...dataFrom } : { ...dataTo, children: [] };

  historyMap.set(parentId, { ...parent!, children: [...parent.children, nodeId!] });
  historyMap.set(nodeId!, newNode as IMindNode);

  if (dataTo) return;

  dataFrom.sideEffect.forEach((node) => {
    historyMap.set(node.nodeId, node);
  });
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

interface IDeleteNodeParams {
  historyData: IHistoryData;
  historyMap: IMindNodes;
  setHistoryDataList?: SetterOrUpdater<IHistoryData[]>;
  historyDataList?: IHistoryData[];
}

const deleteNode = ({ historyData, historyMap, setHistoryDataList }: IDeleteNodeParams) => {
  const parentId = historyData.data.nodeFrom!;
  const parent = historyMap.get(parentId)!;

  const childId = historyData.data.dataFrom
    ? (historyData.data.dataFrom as TDeleteNodeData).nodeId
    : parent.children[parent.children.length - 1];

  const newChildren = historyData.data.dataFrom ? parent.children.filter((cid) => cid !== childId) : parent.children.slice(0, -1);
  historyMap.set(parentId, { ...parent, children: newChildren });

  if (historyData.data.dataTo && !(historyData.data.dataTo as TAddNodeData).nodeId) {
    const newDataTo = { ...historyData.data.dataTo, nodeId: childId };
    const newHistory = { ...historyData!, data: { ...historyData.data, dataTo: newDataTo } };

    setHistoryDataList!((prevList) => {
      const newList = [...prevList];
      const index = newList.findIndex((d) => d.historyId === newHistory.historyId);
      newList.splice(index, 1, newHistory as IHistoryData);
      return newList;
    });
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
