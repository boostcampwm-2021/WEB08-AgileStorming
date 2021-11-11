import { eventType } from 'hooks/useHistoryEmitter';
import { SetterOrUpdater } from 'recoil';
import { IHistories, IHistory } from 'recoil/history';
import { getNextMapState, IMindmapData, IMindNode } from 'recoil/mindmap';
import { INode } from 'recoil/node';

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
  const setChangeNodes = (nextMapState: IMindmapData, nodes: INode[]) => {
    nodes.forEach((node) => nextMapState.mindNodes.set(node.nodeId, { ...node, children: node.children }));
  };
  switch (type) {
    case eventType.ADD_NODE:
    case eventType.CHANGE_CONTENT:
    case eventType.CHANGE_SPRINT:
    case eventType.CHANGE_ASSIGNEE:
    case eventType.CHANGE_EXPECTED_AT:
    case eventType.CHANGE_EXPECTED_TIME:
    case eventType.CHANGE_PRIORITY:
      if (isForward) nextMapState.mindNodes.set(nodeFrom!, dataTo as IMindNode);
      else nextMapState.mindNodes.set(nodeFrom!, dataFrom as IMindNode);
      break;
    case eventType.MOVE_NODE:
      if (isForward) setChangeNodes(nextMapState, dataTo as INode[]);
      else setChangeNodes(nextMapState, dataFrom as INode[]);
      break;
    case eventType.DELETE_NODE:
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
