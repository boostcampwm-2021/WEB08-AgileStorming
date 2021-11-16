import { EventType } from 'hooks/useHistoryEmitter';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { IAddData, historyState, IData, IHistories, IHistory } from 'recoil/history';
import { getNextMapState, IMindmapData, IMindNode, mindmapState } from 'recoil/mindmap';
import { getChildLevel } from 'utils/helpers';

export interface IProps {
  mindmap: IMindmapData;
  setMindmap: SetterOrUpdater<IMindmapData>;
  setHistory: SetterOrUpdater<IHistories>;
}

export interface IHistoryReceiver {
  (history: IHistory): void;
}

export interface IHistoryHandlerProps {
  setMindmap: SetterOrUpdater<IMindmapData>;
  history: IHistory;
  isForward: boolean;
}

interface IAddNodeProps {
  nextMapState: IMindmapData;
  parentId: number;
  id: number;
  data: IData;
}

const TEMP_NODE_ID = -1;

const addNode = ({ data, nextMapState, parentId, id }: IAddNodeProps) => {
  const { content, children } = data.dataTo as IAddData;
  const parsedChildren = JSON.parse(children);
  const parent = nextMapState.mindNodes.get(parentId);
  const level = getChildLevel(parent!.level);

  const node = { content, level, nodeId: id, children: parsedChildren };
  const newChildren = [...parent!.children.filter((childId) => childId !== TEMP_NODE_ID), id];
  const newParent = { ...parent!, children: newChildren };

  nextMapState.mindNodes.set(id, node);
  nextMapState.mindNodes.set(parentId, newParent);
  nextMapState.mindNodes.delete(TEMP_NODE_ID);
};

const setChangeNodes = (mapState: IMindmapData, nodes: IMindNode[]) => {
  nodes.forEach((node) => mapState.mindNodes.set(node.nodeId, { ...node, children: node.children }));
};

export const historyHandler = ({ setMindmap, history, isForward }: IHistoryHandlerProps) => {
  const {
    type,
    data: { nodeTo, nodeFrom, dataFrom, dataTo },
  } = history;

  switch (type) {
    case EventType.ADD_NODE:
      setMindmap((prev) => {
        const nextMapState = getNextMapState(prev);
        addNode({ nextMapState, parentId: nodeFrom!, id: history.id, data: history.data });
        return nextMapState;
      });
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
      break;
    case EventType.UPDATE_NODE_PARENT:
      setMindmap((prev) => {
        const nextMapState = getNextMapState(prev);
        if (isForward) setChangeNodes(nextMapState, dataTo as any);
        else setChangeNodes(nextMapState, dataFrom as any);
        return nextMapState;
      });
      break;
    case EventType.DELETE_NODE:
      // if (isForward) nextMapState.mindNodes.delete(nodeFrom!);
      // else nextMapState.mindNodes.set(nodeFrom!, dataFrom as IMindNode);
      break;
    default:
      break;
  }
};

const useHistoryReceiver = () => {
  const setMindmap = useSetRecoilState(mindmapState);
  const setHistory = useSetRecoilState(historyState);
  const historyReceiver = (history: IHistory) => {
    historyHandler({ setMindmap, history, isForward: true });
    setHistory((prev) => ({ histories: [...prev.histories, history] }));
  };
  return historyReceiver;
};
export default useHistoryReceiver;
