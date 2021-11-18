import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { getNextMapState, mindmapState } from 'recoil/mindmap';
import { labelListState, sprintListState } from 'recoil/project';
import {
  INonHistoryEventData,
  TAddNodeData,
  THistoryEventData,
  TTask,
  TUpdateNodeContent,
  TUpdateNodeParent,
  TUpdateTaskInformation,
} from 'types/event';
import { IHistory, IHistoryData } from 'types/history';
import { ILabel } from 'types/label';
import { IMindmapData, IMindNode } from 'types/mindmap';
import { ISprint } from 'types/sprint';
import { getChildLevel, levelToIdx, setTreeLevel } from 'utils/helpers';

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

interface IUpdateNodeParent {
  nextMapState: IMindmapData;
  oldParentId: number;
  newParentId: number;
  data: TUpdateNodeParent;
}

const TEMP_NODE_ID = -2;

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

const updateNodeParent = ({ nextMapState: { mindNodes }, oldParentId, newParentId, data: { nodeId } }: IUpdateNodeParent) => {
  const oldParentNode = mindNodes.get(oldParentId)!;
  oldParentNode.children = oldParentNode.children.filter((childId) => childId !== nodeId);
  const newParentNode = mindNodes.get(newParentId)!;
  newParentNode.children = [...newParentNode.children, nodeId];
  const childNode = mindNodes.get(nodeId)!;
  childNode.level = getChildLevel(newParentNode.level);
  setTreeLevel(mindNodes, nodeId, levelToIdx(childNode.level));
};

export const historyHandler = ({ setMindmap, historyData, isForward }: IHistoryHandlerProps) => {
  const {
    type,
    data: { nodeFrom, nodeTo, dataFrom, dataTo },
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
      break;
    case 'MOVE_NODE':
      break;
    case 'UPDATE_NODE_PARENT':
      setMindmap((prev) => {
        const nextMapState = getNextMapState(prev);
        const data = dataTo as TUpdateNodeParent;
        if (isForward) updateNodeParent({ nextMapState, oldParentId: nodeFrom!, newParentId: nodeTo!, data });
        else updateNodeParent({ nextMapState, oldParentId: nodeTo!, newParentId: nodeFrom!, data });
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
  setLabelList: SetterOrUpdater<Record<number, ILabel>>;
  setSprintList: SetterOrUpdater<Record<number, ISprint>>;
}

const nonHistoryEventHandler = ({ response, setLabelList, setSprintList }: INonHistoryEventHandlerProps) => {
  const { type, dbData } = response;

  switch (type) {
    case 'ADD_LABEL':
      const newLabel = dbData as ILabel;
      setLabelList((prev) => ({ ...prev, [newLabel.id]: newLabel }));
      break;
    case 'ADD_SPRINT':
      const newSprint = dbData as ISprint;
      setSprintList((prev) => ({ ...prev, [newSprint.id]: newSprint }));
      break;
    default:
      break;
  }
};

const useHistoryReceiver = () => {
  const setMindmap = useSetRecoilState(mindmapState);
  const setLabelList = useSetRecoilState(labelListState);
  const setSprintList = useSetRecoilState(sprintListState);

  const historyReceiver = (historyData: IHistoryData) => {
    historyHandler({ setMindmap, historyData, isForward: true });
  };
  const nonHistoryEventReceiver = (response: INonHistoryEventData) => nonHistoryEventHandler({ response, setLabelList, setSprintList });

  return { historyReceiver, nonHistoryEventReceiver };
};
export default useHistoryReceiver;
