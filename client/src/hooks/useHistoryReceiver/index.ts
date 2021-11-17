import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';
import { getNextMapState, mindmapState } from 'recoil/mindmap';
import { labelListState, projectIdState } from 'recoil/project';
import { INonHistoryEventData, TAddNodeData, THistoryEventData, TTask, TUpdateNodeContent, TUpdateTaskInformation } from 'types/event';
import { IHistory, IHistoryData } from 'types/history';
import { ILabel } from 'types/label';
import { IMindmapData, IMindNode } from 'types/mindmap';
import { getChildLevel } from 'utils/helpers';

export interface IProps {
  mindmap: IMindmapData;
  setMindmap: SetterOrUpdater<IMindmapData>;
  setHistory: SetterOrUpdater<IHistory>;
}

export interface IHistoryReceiver {
  (history: IHistoryData): void;
}

export interface IHistoryHandlerProps {
  setMindmap: SetterOrUpdater<IMindmapData>;
  historyData: IHistoryData;
  isForward: boolean;
}

interface IAddNodeProps {
  nextMapState: IMindmapData;
  parentId: number;
  newId: number;
  data: THistoryEventData;
}

const TEMP_NODE_ID = -1;

const addNode = ({ data, nextMapState, parentId, newId }: IAddNodeProps) => {
  const { content } = data.dataTo as TAddNodeData;
  const parent = nextMapState.mindNodes.get(parentId);
  const level = getChildLevel(parent!.level);

  const newNode = { content, level, nodeId: newId, children: [] };
  const newChildren = [...parent!.children.filter((childId) => childId !== TEMP_NODE_ID), newId];
  const newParent = { ...parent!, children: newChildren };

  nextMapState.mindNodes.set(newId, newNode);
  nextMapState.mindNodes.set(parentId, newParent);
  nextMapState.mindNodes.delete(TEMP_NODE_ID);
};

const setChangeNodes = (mapState: IMindmapData, nodes: IMindNode[]) => {
  nodes.forEach((node) => mapState.mindNodes.set(node.nodeId, { ...node, children: node.children }));
};

export const historyHandler = ({ setMindmap, historyData, isForward }: IHistoryHandlerProps) => {
  const {
    type,
    data: { nodeFrom, dataFrom, dataTo },
    newNodeId,
  } = historyData;

  switch (type) {
    case 'ADD_NODE':
      setMindmap((prev) => {
        const nextMapState = getNextMapState(prev);
        if (isForward) addNode({ nextMapState, parentId: nodeFrom!, newId: newNodeId!, data: historyData.data });
        return nextMapState;
      });
      break;
    case 'DELETE_NODE':
      // if (isForward) nextMapState.mindNodes.delete(nodeFrom!);
      // else nextMapState.mindNodes.set(nodeFrom!, dataFrom as IMindNode);
      break;
    case 'MOVE_NODE':
      break;
    case 'UPDATE_NODE_PARENT':
      setMindmap((prev) => {
        const nextMapState = getNextMapState(prev);
        if (isForward) setChangeNodes(nextMapState, dataTo as any);
        else setChangeNodes(nextMapState, dataFrom as any);
        return nextMapState;
      });
      break;
    case 'UPDATE_NODE_SIBLING':
      break;
    case 'UPDATE_NODE_CONTENT':
      setMindmap((prev) => {
        const nextMapState = getNextMapState(prev);
        const targetNode = nextMapState.mindNodes.get(nodeFrom!)!;
        nextMapState.mindNodes.set(nodeFrom!, {
          ...targetNode,
          ...((isForward ? dataTo : dataFrom) as TUpdateNodeContent),
        });
        return nextMapState;
      });
      break;
    case 'UPDATE_TASK_INFORMATION':
      setMindmap((prev) => {
        const nextMapState = getNextMapState(prev);
        const targetNode = nextMapState.mindNodes.get(nodeFrom!)!;
        nextMapState.mindNodes.set(nodeFrom!, {
          ...targetNode,
          ...(((isForward ? dataTo : dataFrom) as TUpdateTaskInformation).changed as TTask),
        });
        return nextMapState;
      });
      break;
    default:
      break;
  }
};

interface INonHistoryEventHandlerProps {
  response: INonHistoryEventData;
  myProjectId: string | null;
  setLabelList: SetterOrUpdater<ILabel[]>;
}

const nonHistoryEventHandler = ({ response, myProjectId, setLabelList }: INonHistoryEventHandlerProps) => {
  const { projectId, type, dbData } = response;

  if (projectId !== myProjectId) {
    return;
  }

  switch (type) {
    case 'ADD_LABEL':
      setLabelList((prev) => [...prev, dbData as ILabel]);
      break;
    default:
      break;
  }
};

const useHistoryReceiver = () => {
  const myProjectId = useRecoilValue(projectIdState);
  const setMindmap = useSetRecoilState(mindmapState);
  const setLabelList = useSetRecoilState(labelListState);

  const historyReceiver = (historyData: IHistoryData) => {
    historyHandler({ setMindmap, historyData, isForward: true });
  };
  const nonHistoryEventReceiver = (response: INonHistoryEventData) => nonHistoryEventHandler({ response, myProjectId, setLabelList });

  return { historyReceiver, nonHistoryEventReceiver };
};
export default useHistoryReceiver;
