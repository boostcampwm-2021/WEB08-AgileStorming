import { createNode, updateNode, updateNodeParent, deleteNode } from '../services/mindmap';
import { deleteTask, updateTask } from '../services/task';
import { createSprint, deleteSprint } from '../services/sprint';
import { createLabel, deleteLabel } from '../services/label';
import { createComment, deleteComment } from '../services/comment';
import * as eventType from './event-type';

enum EventArgs {
  'type' = 1,
  'project' = 3,
  'user' = 5,
  'data' = 7,
}

type THistoryEventFunction = (data?: eventType.THistoryEventData, project?: string, user?: number) => Promise<number> | void;
type TEventFunction = (data?: eventType.TEventData, project?: string, user?: number) => Promise<number> | Promise<string> | void;

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
      const { nodeId, nodeParentType } = dataTo as eventType.TUpdateNodeParent;
      updateNodeParent(nodeFrom, nodeTo, nodeId);
      if (nodeParentType !== 'STORY') deleteTask(nodeId);
      return;
    },
    UPDATE_NODE_SIBLING: ({ dataTo }) => {
      const { parentId, children } = dataTo as eventType.TUpdateNodeSibling;
      updateNode(parentId, { children: JSON.stringify(children) });
      return;
    },
    UPDATE_NODE_CONTENT: ({ nodeFrom, dataTo }) => {
      updateNode(nodeFrom, dataTo as eventType.TUpdateNodeContent);
      return;
    },
    UPDATE_TASK_INFORMATION: ({ nodeFrom, dataTo }) => {
      updateTask(nodeFrom, dataTo as eventType.TUpdateTaskInformation);
      return;
    },
  };
};

const eventFunction = (): Record<eventType.TEventType, TEventFunction> => {
  return {
    ADD_SPRINT: async (data, project) => {
      const { id, name, color, startDate, endDate } = await createSprint(project, data as eventType.TAddSprint);
      return JSON.stringify({ id, name, color, startDate, endDate });
    },
    ADD_LABEL: async (data, project) => {
      const { id, name, color } = await createLabel(project, data as eventType.TAddLabel);
      return JSON.stringify({ id, name, color });
    },
    ADD_COMMENT: (data) => {
      return createComment(data as eventType.TAddComment);
    },
    DELETE_SPRINT: (data) => {
      const { sprintId } = data as eventType.TDeleteSprint;
      deleteSprint(sprintId);
      return;
    },
    DELETE_LABEL: (data) => {
      const { labelId } = data as eventType.TDeleteLabel;
      deleteLabel(labelId);
      return;
    },
    DELETE_COMMENT: (data) => {
      const { commentId } = data as eventType.TDeleteComment;
      deleteComment(commentId);
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
