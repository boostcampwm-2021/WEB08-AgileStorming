import { createNode, updateNode, deleteNode } from '../services/mindmap';
import * as eventType from './event-type';

enum EventArgs {
  'type' = 1,
  'project' = 3,
  'user' = 5,
  'data' = 7,
}

type THistoryEventFunction = (data?: eventType.THistoryEventData, project?: string, user?: number) => Promise<number> | void;
type TEventFunction = (data?: eventType.TEventData, project?: string, user?: number) => Promise<number> | void;

const historyEventFunction = (): Record<eventType.THistoryEventType, THistoryEventFunction> => {
  return {
    ADD_NODE: ({ nodeFrom, dataTo }, project: string) => {
      return createNode(project, nodeFrom, dataTo as eventType.TAddNodeData);
    },
    DELETE_NODE: ({ nodeFrom, dataFrom }) => {
      deleteNode(nodeFrom, (dataFrom as eventType.TDeleteNodeData).nodeId);
      return;
    },
    MOVE_NODE: ({ nodeTo, dataTo }) => {
      updateNode(nodeTo, dataTo as eventType.TMoveNodeData);
      return;
    },
    UPDATE_NODE_PARENT: ({ nodeFrom, nodeTo, dataTo }) => {
      return;
    },
    UPDATE_NODE_SIBLING: ({ nodeFrom, dataTo }) => {
      return;
    },
    UPDATE_NODE_CONTENT: ({ nodeFrom, dataTo }) => {
      updateNode(nodeFrom, dataTo as eventType.TUpdateNodeContent);
      return;
    },
    UPDATE_TASK_INFORMATION: ({ nodeFrom, dataTo }) => {
      const { changed } = dataTo as eventType.TUpdateTaskInformation;
      return;
    },
  };
};

const eventFunction = (): Record<eventType.TEventType, TEventFunction> => {
  return {
    ADD_SPRINT: (data, project) => {
      const { name, startDate, dueDate } = data as eventType.TAddSprint;
      return;
    },
    ADD_LABEL: (data, project) => {
      const { name } = data as eventType.TAddLabel;
      return;
    },
    ADD_COMMENT: (data, project) => {
      const { nodeId, comment } = data as eventType.TAddComment;
      return;
    },
    DELETE_SPRINT: (data, project) => {
      const { sprintId } = data as eventType.TDeleteSprint;
      return;
    },
    DELETE_LABEL: (data, project) => {
      const { labelId } = data as eventType.TDeleteLabel;
      return;
    },
    DELETE_COMMENT: (data, project) => {
      const { nodeId, commentId } = data as eventType.TDeleteComment;
      return;
    },
  };
};

export const convertHistoryEvent = (args: string[]) => {
  const [type, project, user, data] = ['type', 'project', 'user', 'data'].map((str) => args[EventArgs[str]]);
  return historyEventFunction()[type](JSON.parse(data), project, user);
};

export const convertEvent = (args: string[]) => {
  const [type, project, user, data] = ['type', 'project', 'user', 'data'].map((str) => args[EventArgs[str]]);
  return eventFunction()[type](JSON.parse(data), project, user);
};
