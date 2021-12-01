import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { getNextMapState, mindmapState } from 'recoil/mindmap';
import { labelListState, sprintListState } from 'recoil/project';
import {
  INonHistoryEventData,
  TAddNodeData,
  TDeleteLabel,
  TDeleteNodeData,
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
}

interface IAddNodeProps {
  mindNodes: IMindNodes;
  parentId: number;
  newId: number;
  data: THistoryEventData;
}

interface IDeleteNodeProps {
  mindNodes: IMindNodes;
  targetId: number;
  dataFrom: TDeleteNodeData;
}

interface IUpdateNodeParentProps {
  mindNodes: IMindNodes;
  oldParentId: number;
  newParentId: number;
  data: TUpdateNodeParent;
}

interface IUpdateNodeContentProps {
  mindNodes: IMindNodes;
  targetId: number;
  dataTo: TUpdateNodeContent;
}

interface IUpdateTaskInformationProps {
  mindNodes: IMindNodes;
  targetId: number;
  dataTo: TUpdateTaskInformation;
}

export const addNode = ({ data, mindNodes, parentId, newId }: IAddNodeProps) => {
  const { content } = data.dataTo as TAddNodeData;
  const parent = mindNodes.get(parentId);
  const level = getChildLevel(parent!.level);

  const newNode = { content, level, nodeId: newId, children: [] };
  const newParent = { ...parent!, children: [...parent!.children, newId] };

  mindNodes.set(newId, newNode);
  mindNodes.set(parentId, newParent);
};

export const deleteNode = ({ mindNodes, targetId, dataFrom }: IDeleteNodeProps) => {
  const parentNode = mindNodes.get(targetId)!;
  const { nodeId, sideEffect } = dataFrom;
  parentNode.children = parentNode.children.filter((childId) => childId !== nodeId);
  mindNodes.delete(nodeId!);
  sideEffect.forEach((childNode) => mindNodes.delete(childNode.nodeId));
};

export const updateNodeParent = ({ mindNodes, oldParentId, newParentId, data: { nodeId } }: IUpdateNodeParentProps) => {
  const oldParentNode = mindNodes.get(oldParentId)!;
  oldParentNode.children = oldParentNode.children.filter((childId) => childId !== nodeId);
  const newParentNode = mindNodes.get(newParentId)!;
  newParentNode.children = [...newParentNode.children, nodeId];
  const childNode = mindNodes.get(nodeId)!;
  childNode.level = getChildLevel(newParentNode.level);
  setTreeLevel(mindNodes, nodeId, levelToIdx(childNode.level));
};

export const updateNodeContent = ({ mindNodes, targetId, dataTo }: IUpdateNodeContentProps) => {
  const targetNode = mindNodes.get(targetId)!;
  mindNodes.set(targetId!, {
    ...targetNode,
    ...dataTo,
  });
};

export const updateTaskInformation = ({ mindNodes, targetId, dataTo }: IUpdateTaskInformationProps) => {
  const targetNode = mindNodes.get(targetId)!;
  mindNodes.set(targetId, {
    ...targetNode,
    ...(dataTo.changed as TTask),
  });
};

export const historyHandler = ({ setMindmap, historyData }: IHistoryHandlerProps) => {
  const {
    type,
    data: { nodeFrom, nodeTo, dataFrom, dataTo },
    newNodeId,
  } = historyData;

  switch (type) {
    case 'ADD_NODE':
      setMindmap((prev) => {
        const nextMapState = getNextMapState(prev);
        addNode({ mindNodes: nextMapState.mindNodes, parentId: nodeFrom!, newId: newNodeId!, data: historyData.data });
        return nextMapState;
      });
      break;
    case 'DELETE_NODE':
      setMindmap((prev) => {
        const nextMapState = getNextMapState(prev);
        deleteNode({ mindNodes: nextMapState.mindNodes, targetId: nodeFrom!, dataFrom: dataFrom as TDeleteNodeData });
        return nextMapState;
      });
      break;
    case 'UPDATE_NODE_PARENT':
      setMindmap((prev) => {
        const nextMapState = getNextMapState(prev);
        updateNodeParent({
          mindNodes: nextMapState.mindNodes,
          oldParentId: nodeFrom!,
          newParentId: nodeTo!,
          data: dataTo as TUpdateNodeParent,
        });
        return nextMapState;
      });
      break;
    case 'UPDATE_NODE_CONTENT':
      setMindmap((prev) => {
        const nextMapState = getNextMapState(prev);
        updateNodeContent({ mindNodes: nextMapState.mindNodes, targetId: nodeFrom!, dataTo: dataTo as TUpdateNodeContent });
        return nextMapState;
      });
      break;
    case 'UPDATE_TASK_INFORMATION':
      setMindmap((prev) => {
        const nextMapState = getNextMapState(prev);
        updateTaskInformation({ mindNodes: nextMapState.mindNodes, targetId: nodeFrom!, dataTo: dataTo as TUpdateTaskInformation });
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
    historyHandler({ setMindmap, historyData });
  };
  const nonHistoryEventReceiver = (response: INonHistoryEventData) => nonHistoryEventHandler({ response, setLabelList, setSprintList });

  return { historyReceiver, nonHistoryEventReceiver };
};
export default useHistoryReceiver;
