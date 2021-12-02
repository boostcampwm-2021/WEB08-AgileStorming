import { snapshot_UNSTABLE } from 'recoil';
import { assigneeFilterState, filteredTaskState, labelFilterState, sprintFilterState } from '.';
import { mindmapState } from 'recoil/mindmap';

describe('FilteredTask selector는', () => {
  const dummyNode = (nodeId: number, assigneeId: string, sprintId: number, labelIds: string, level: string) => ({
    nodeId,
    assigneeId,
    sprintId,
    labelIds,
    level,
  });
  const initialMindMap = new Map();
  initialMindMap.set(0, dummyNode(1, '담당자1', 1, '[1]', 'TASK'));
  initialMindMap.set(1, dummyNode(2, '담당자2', 2, '[2]', 'TASK'));
  initialMindMap.set(2, dummyNode(3, '담당자3', 3, '[3]', 'TASK'));
  initialMindMap.set(3, dummyNode(4, '담당자2', 2, '[1,3]', 'TASK'));
  initialMindMap.set(4, dummyNode(5, '담당자1', 2, '[1,2,3]', 'STORY'));

  it('테스크만을 반환한다.', () => {
    const testSnapshot = snapshot_UNSTABLE(({ set }) => set(mindmapState, { rootId: 1, mindNodes: initialMindMap }));
    const filteredTask = testSnapshot.getLoadable(filteredTaskState).valueOrThrow();
    expect(Object.values(filteredTask)).toHaveLength(4);
  });

  it('스프린트 필터를 적용할 수 있다.', () => {
    const testSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(mindmapState, { rootId: 1, mindNodes: initialMindMap });
      set(sprintFilterState, 1);
    });
    const filteredTask = testSnapshot.getLoadable(filteredTaskState).valueOrThrow();
    expect(Object.values(filteredTask)).toHaveLength(1);
  });

  it('라벨 필터를 적용할 수 있다.', () => {
    const testSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(mindmapState, { rootId: 1, mindNodes: initialMindMap });
      set(labelFilterState, 3);
    });
    const filteredTask = testSnapshot.getLoadable(filteredTaskState).valueOrThrow();
    expect(Object.values(filteredTask)).toHaveLength(2);
  });

  it('담당자 필터를 적용할 수 있다.', () => {
    const testSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(mindmapState, { rootId: 1, mindNodes: initialMindMap });
      set(assigneeFilterState, '담당자2');
    });
    const filteredTask = testSnapshot.getLoadable(filteredTaskState).valueOrThrow();
    expect(Object.values(filteredTask)).toHaveLength(2);
  });

  it('복수의 필터를 적용할 수 있다.', () => {
    const testSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(mindmapState, { rootId: 1, mindNodes: initialMindMap });
      set(sprintFilterState, 2);
      set(labelFilterState, 2);
      set(assigneeFilterState, '담당자2');
    });
    const filteredTask = testSnapshot.getLoadable(filteredTaskState).valueOrThrow();
    expect(Object.values(filteredTask)).toHaveLength(1);
  });

  it('필터의 결과가 비었을 때는 빈 배열을 반환한다.', () => {
    const testSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(mindmapState, { rootId: 1, mindNodes: initialMindMap });
      set(sprintFilterState, 2);
      set(labelFilterState, 2);
      set(assigneeFilterState, '담당자1');
    });
    const filteredTask = testSnapshot.getLoadable(filteredTaskState).valueOrThrow();
    expect(Object.values(filteredTask)).toHaveLength(0);
  });
});
