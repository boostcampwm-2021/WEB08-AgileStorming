import { EventType } from 'hooks/useHistoryEmitter';
import { SetterOrUpdater } from 'recoil';
import { AddData, IData, IHistories, IHistory, TDataTypes } from 'recoil/history';
import { getNextMapState, IMindmapData, IMindNode } from 'recoil/mindmap';
import { idxToLevel, levelToIdx } from 'utils/helpers';

export interface IProps {
  mindmap: IMindmapData;
  setMindmap: SetterOrUpdater<IMindmapData>;
  setHistory: SetterOrUpdater<IHistories>;
}

export interface IHistoryReceiver {
  (history: IHistory): void;
}

export interface IHistoryHandlerProps {
  mindmap: IMindmapData;
  setMindmap: SetterOrUpdater<IMindmapData>;
  history: IHistory;
  isForward: boolean;
}

interface IAddNodeProps {
  mapState: IMindmapData;
  parentId: number;
  id: number;
  data: IData;
  mindmapSetter: SetterOrUpdater<IMindmapData>;
}

export const historyHandler = ({ mindmap, setMindmap, history, isForward }: IHistoryHandlerProps) => {
  const {
    type,
    data: { nodeTo, nodeFrom, dataFrom, dataTo },
  } = history;
  const nextMapState = getNextMapState(mindmap);
  const setChangeNodes = (mapState: IMindmapData, nodes: IMindNode[]) => {
    nodes.forEach((node) => mapState.mindNodes.set(node.nodeId, { ...node, children: node.children }));
  };

  const addNode = ({ data, mapState, parentId, id, mindmapSetter }: IAddNodeProps) => {
    const { content, children } = data.dataTo as AddData;
    const parsedChildren = JSON.parse(children);
    const parent = mapState.mindNodes.get(parentId);
    const level = idxToLevel(levelToIdx(parent!.level) + 1);
    const node = { content, level, nodeId: id, children: parsedChildren };
    const newChildren = [...parent!.children.filter((childId) => childId !== -1), id];
    const newParent = { ...parent!, children: newChildren };
    nextMapState.mindNodes.set(id, node);
    nextMapState.mindNodes.set(parentId, newParent);
    nextMapState.mindNodes.delete(-1);
    mindmapSetter(nextMapState);
  };

  switch (type) {
    case EventType.ADD_NODE:
      addNode({ mapState: nextMapState, parentId: nodeFrom!, id: history.id, data: history.data, mindmapSetter: setMindmap });
      break;
    case EventType.CHANGE_CONTENT:
    case EventType.CHANGE_SPRINT:
    case EventType.CHANGE_ASSIGNEE:
    case EventType.CHANGE_EXPECTED_AT:
    case EventType.CHANGE_EXPECTED_TIME:
    case EventType.CHANGE_PRIORITY:
      // if (isForward) nextMapState.mindNodes.set(nodeFrom!, dataTo as IMindNode);
      // else nextMapState.mindNodes.set(nodeFrom!, dataFrom as IMindNode);
      break;
    case EventType.MOVE_NODE:
      // if (isForward) setChangeNodes(nextMapState, dataTo as IMindNode[]);
      // else setChangeNodes(nextMapState, dataFrom as IMindNode[]);
      break;
    case EventType.DELETE_NODE:
      if (isForward) nextMapState.mindNodes.delete(nodeFrom!);
      // else nextMapState.mindNodes.set(nodeFrom!, dataFrom as IMindNode);
      break;
    default:
      break;
  }
  setMindmap(nextMapState);
};

const useHistoryReceiver = ({ mindmap, setMindmap, setHistory }: IProps) => {
  const historyReceiver = (history: IHistory) => {
    historyHandler({ mindmap, setMindmap, history, isForward: true });
    setHistory((prev) => ({ histories: [...prev.histories, history] }));
  };
  return historyReceiver;
};
export default useHistoryReceiver;
