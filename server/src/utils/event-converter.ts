import { createNode, updateNode, deleteNode } from '../services/mindmap';
import * as eventType from './event-type';

enum EventArgs {
  'type' = 1,
  'project' = 3,
  'user' = 5,
  'data' = 7,
}
type TEventFunction = (data?: eventType.TEventData, project?: string, user?: number) => Promise<number> | void;

const eventFunction = (): Record<eventType.TEventType, TEventFunction> => {
  return {
    ADD_NODE: ({ nodeFrom, dataTo }, project: string) => {
      return createNode(project, nodeFrom, dataTo);
    },
    DELETE_NODE: ({ nodeFrom, dataFrom }) => {
      deleteNode(nodeFrom, (dataFrom as eventType.TDeleteNodeData).nodeId);
      return;
    },
    UPDATE_NODE_CONTENT: ({ nodeFrom, dataTo }) => {
      updateNode(nodeFrom, dataTo);
      return;
    },
    MOVE_NODE: () => {
      return;
    },
  };
};

export const convertEvent = (args: string[]) => {
  const [type, project, user, data] = ['type', 'project', 'user', 'data'].map((str) => args[EventArgs[str]]);
  return eventFunction()[type](JSON.parse(data), project, user);
};
