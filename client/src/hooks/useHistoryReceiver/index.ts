import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { getNextMapState, mindmapState, TEMP_NODE_ID } from 'recoil/mindmap';
import { labelListState, sprintListState } from 'recoil/project';
import {
  INonHistoryEventData,
  TAddNodeData,
  TDeleteLabel,
  TDeleteSprint,
  THistoryEventData,
  TTask,
  TUpdateNodeContent,
  TUpdateNodeParent,
  TUpdateTaskInformation,
} from 'types/event';
import { IHistoryData } from 'types/history';
import { ILabel } from 'types/label';
import { IMindmapData, IMindNodes } from 'types/mindmap';
import { ISprint } from 'types/sprint';
import { getChildLevel, levelToIdx, setTreeLevel } from 'utils/helpers';

export interface IHistoryReceiver {
  (history: IHistoryData): void;
}

export interface IHistoryHandlerProps {
  setMindmap: SetterOrUpdater<IMindmapData>;
  historyData: IHistoryData;
  isForward: boolean;
}

interface IAddNodeProps {
  mindNodes: IMindNodes;
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

const addNode = ({ data, mindNodes, parentId, newId }: IAddNodeProps) => {
  const { content } = data.dataTo as TAddNodeData;
  const parent = mindNodes.get(parentId);
  const level = getChildLevel(parent!.level);

  const newNode = { content, level, nodeId: newId, children: [] };
  const newChildren = [...parent!.children.filter((childId) => childId !== TEMP_NODE_ID), newId];
  const newParent = { ...parent!, children: newChildren };

  mindNodes.set(newId, newNode);
  mindNodes.set(parentId, newParent);
  mindNodes.delete(TEMP_NODE_ID);
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
      if (isForward)
        setMindmap((prev) => {
          const nextMapState = getNextMapState(prev);
          if (isForward) addNode({ mindNodes: nextMapState.mindNodes, parentId: nodeFrom!, newId: newNodeId!, data: historyData.data });
          return nextMapState;
        });
      else {
      }
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
  const { type, data, dbData } = response;

  switch (type) {
    case 'ADD_LABEL':
      const newLabel = dbData as ILabel;
      setLabelList((prev) => ({ ...prev, [newLabel.id]: newLabel }));
      break;
    case 'DELETE_LABEL':
      const { labelId } = data as TDeleteLabel;
      setLabelList((prev) => {
        const newLabelList = { ...prev };
        delete newLabelList[labelId];
        return newLabelList;
      });
      break;
    case 'ADD_SPRINT':
      const newSprint = dbData as ISprint;
      setSprintList((prev) => ({ ...prev, [newSprint.id]: newSprint }));
      break;
    case 'DELETE_SPRINT':
      const { sprintId } = data as TDeleteSprint;
      setSprintList((prev) => {
        const newSprintList = { ...prev };
        delete newSprintList[sprintId];
        return newSprintList;
      });
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
