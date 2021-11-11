import { createNode, updateNode, deleteNode } from '../services/mindmap';

type eventType = 'ADD_NODE' | 'DELETE_NODE' | 'UPDATE_NODE_CONTENT' | 'MOVE_NODE';
enum eventArgs {
  'type' = 1,
  'project' = 3,
  'user' = 5,
  'data' = 7,
}

const eventFunction = (): Record<eventType, any> => {
  return {
    ADD_NODE: (data: string, project: string) => {
      const { nodeFrom, dataTo } = JSON.parse(data);
      return createNode(project, nodeFrom, dataTo);
    },
    DELETE_NODE: (data: string) => {
      const { nodeFrom, dataFrom } = JSON.parse(data);
      deleteNode(nodeFrom, dataFrom['nodeId']);
      return;
    },
    UPDATE_NODE_CONTENT: (data: string) => {
      const { nodeFrom, dataTo } = JSON.parse(data);
      updateNode(nodeFrom, dataTo);
      return;
    },
    MOVE_NODE: (data: string) => {
      return;
    },
  };
};

export const convertEvent = (args: string[]) => {
  const [type, project, user, data] = ['type', 'project', 'user', 'data'].map((str) => args[eventArgs[str]]);
  return eventFunction()[type](data, project, user);
};
