import { EventType } from 'hooks/useHistoryEmitter';
import { SetterOrUpdater } from 'recoil';
import { IHistories, IHistory } from 'recoil/history';
import { getNextMapState, IMindmapData, IMindNode } from 'recoil/mindmap';

export interface IProps {
  mindmap: IMindmapData;
  setMindmap: SetterOrUpdater<IMindmapData>;
  setHistory: SetterOrUpdater<IHistories>;
}

export interface IHistoryReceiver {
  (props: IHistory): void;
}

export interface IHistoryHandlerProps {
  mindmap: IMindmapData;
  setMindmap: SetterOrUpdater<IMindmapData>;
  history: IHistory;
  isForward: boolean;
}

export const historyHandler = ({ mindmap, setMindmap, history, isForward }: IHistoryHandlerProps) => {
  const {
    type,
    data: { nodeFrom, dataFrom, dataTo },
  } = history;
  const nextMapState = getNextMapState(mindmap);
  const setChangeNodes = (mapState: IMindmapData, nodes: IMindNode[]) => {
    nodes.forEach((node) => mapState.mindNodes.set(node.nodeId, { ...node, children: node.children }));
  };
  switch (type) {
    case EventType.ADD_NODE:
    case EventType.CHANGE_CONTENT:
    case EventType.CHANGE_SPRINT:
    case EventType.CHANGE_ASSIGNEE:
    case EventType.CHANGE_EXPECTED_AT:
    case EventType.CHANGE_EXPECTED_TIME:
    case EventType.CHANGE_PRIORITY:
      if (isForward) nextMapState.mindNodes.set(nodeFrom!, dataTo as IMindNode);
      else nextMapState.mindNodes.set(nodeFrom!, dataFrom as IMindNode);
      break;
    case EventType.MOVE_NODE:
      if (isForward) setChangeNodes(nextMapState, dataTo as IMindNode[]);
      else setChangeNodes(nextMapState, dataFrom as IMindNode[]);
      break;
    case EventType.DELETE_NODE:
      if (isForward) nextMapState.mindNodes.delete(nodeFrom!);
      else nextMapState.mindNodes.set(nodeFrom!, dataFrom as IMindNode);
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
