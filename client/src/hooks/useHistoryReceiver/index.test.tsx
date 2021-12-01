import { snapshot_UNSTABLE } from 'recoil';
import { getNextMapState, mindmapState } from 'recoil/mindmap';
import { TDeleteNodeData, TUpdateNodeContent, TUpdateNodeParent, TUpdateTaskInformation } from 'types/event';
import { IMindNode } from 'types/mindmap';
import { Levels } from 'utils/helpers';
import { addNode, deleteNode, updateNodeContent, updateNodeParent, updateTaskInformation } from '.';

describe('historyHandler는', () => {
  const dummyNode = (nodeId: number, level: Levels, children: Array<number>): IMindNode => ({
    nodeId,
    level,
    content: level + nodeId,
    children,
  });

  const initialMindMap = new Map();
  initialMindMap.set(0, dummyNode(0, 'ROOT', [1]));
  initialMindMap.set(1, dummyNode(1, 'EPIC', [2]));
  initialMindMap.set(2, dummyNode(2, 'STORY', [3]));
  initialMindMap.set(3, dummyNode(3, 'TASK', []));

  it('ADD_NODE 이벤트를 처리할 수 있다.', () => {
    const [nodeFrom, newNodeId] = [2, 4];
    const data = { nodeFrom, nodeTo: null, dataFrom: null, dataTo: { content: 'new Node' } };
    const testSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(mindmapState, { rootId: 0, mindNodes: initialMindMap });
      set(mindmapState, (prev) => {
        const nextMapState = getNextMapState(prev);
        addNode({ mindNodes: nextMapState.mindNodes, parentId: nodeFrom!, newId: newNodeId!, data: data });
        return nextMapState;
      });
    });
    const mindmapTree = testSnapshot.getLoadable(mindmapState).valueOrThrow();
    expect(mindmapTree.mindNodes.get(newNodeId)?.content).toBe('new Node');
  });

  it('DELETE_NODE 이벤트를 처리할 수 있다.', () => {
    const [nodeFrom, deleteId] = [2, 3];
    const data = { nodeFrom: nodeFrom, nodeTo: null, dataFrom: { nodeId: deleteId, sideEffect: [] as Array<IMindNode> }, dataTo: null };
    const testSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(mindmapState, { rootId: 0, mindNodes: initialMindMap });
      set(mindmapState, (prev) => {
        const nextMapState = getNextMapState(prev);
        deleteNode({ mindNodes: nextMapState.mindNodes, targetId: data.nodeFrom, dataFrom: data.dataFrom as TDeleteNodeData });
        return nextMapState;
      });
    });
    const mindmapTree = testSnapshot.getLoadable(mindmapState).valueOrThrow();
    expect(mindmapTree.mindNodes.get(deleteId)).toBe(undefined);
  });

  it('UPDATE_NODE_PARENT 이벤트를 처리할 수 있다.', () => {
    const [oldParentId, newParentId, targetId] = [2, 1, 3];
    const data = { nodeFrom: oldParentId, nodeTo: newParentId, dataTo: { nodeId: targetId, nodeType: 'TASK', nodeParentType: 'EPIC' } };
    const testSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(mindmapState, { rootId: 0, mindNodes: initialMindMap });
      set(mindmapState, (prev) => {
        const nextMapState = getNextMapState(prev);
        updateNodeParent({
          mindNodes: nextMapState.mindNodes,
          oldParentId: data.nodeFrom,
          newParentId: data.nodeTo,
          data: data.dataTo as TUpdateNodeParent,
        });
        return nextMapState;
      });
    });
    const mindmapTree = testSnapshot.getLoadable(mindmapState).valueOrThrow();
    expect(mindmapTree.mindNodes.get(targetId)?.level).toBe('STORY');
  });

  it('UPDATE_NODE_CONTENT 이벤트를 처리할 수 있다.', () => {
    const nodeFrom = 2;
    const data = { nodeFrom: nodeFrom, nodeTo: null, dataFrom: null, dataTo: { content: 'content Changed' } };
    const testSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(mindmapState, { rootId: 0, mindNodes: initialMindMap });
      set(mindmapState, (prev) => {
        const nextMapState = getNextMapState(prev);
        updateNodeContent({ mindNodes: nextMapState.mindNodes, targetId: data.nodeFrom, dataTo: data.dataTo as TUpdateNodeContent });
        return nextMapState;
      });
    });
    const mindmapTree = testSnapshot.getLoadable(mindmapState).valueOrThrow();
    expect(mindmapTree.mindNodes.get(nodeFrom)?.content).toBe('content Changed');
  });

  it('UPDATE_TASK_INFORMATION 이벤트를 처리할 수 있다.', () => {
    const nodeFrom = 2;
    const data = { nodeFrom: nodeFrom, nodeTo: null, dataFrom: null, dataTo: { changed: { assigneeId: 'mario' } } };
    const testSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(mindmapState, { rootId: 0, mindNodes: initialMindMap });
      set(mindmapState, (prev) => {
        const nextMapState = getNextMapState(prev);
        updateTaskInformation({
          mindNodes: nextMapState.mindNodes,
          targetId: data.nodeFrom,
          dataTo: data.dataTo as TUpdateTaskInformation,
        });
        return nextMapState;
      });
    });
    const mindmapTree = testSnapshot.getLoadable(mindmapState).valueOrThrow();
    expect(mindmapTree.mindNodes.get(nodeFrom)?.assigneeId).toBe('mario');
  });
});
