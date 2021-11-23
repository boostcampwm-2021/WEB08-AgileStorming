import { atom, selector } from 'recoil';
import { TAddNodeData, TDeleteNodeData, THistoryEventData, TUpdateNodeParent } from 'types/event';
import { IHistoryData } from 'types/history';

const CANNOT_FIND_NODE_ID = -3;

export const historyDataListState = atom<IHistoryData[]>({
  key: 'historyDataListAtom',
  default: [],
});

export const farthestHistoryIdState = atom<string | undefined>({
  key: 'farthestHistoryAtom',
  default: undefined,
});

export const currentReverseIdxState = atom<number>({ key: 'currentReverseIdxAtom', default: -1 });

export const currentHistoryNodeIdState = selector({
  key: 'currentHistoryNodeIdState',
  get: ({ get }) => {
    const currentReverseIdx = get(currentReverseIdxState);
    const historyDataList = get(historyDataListState);

    const currentNodeData = historyDataList.at(currentReverseIdx);
    switch (currentNodeData?.type) {
      case 'ADD_NODE':
        return (currentNodeData.data.dataTo! as TAddNodeData).nodeId;
      case 'DELETE_NODE':
        return (currentNodeData.data.dataFrom! as TDeleteNodeData).nodeId;
      case 'UPDATE_NODE_PARENT':
        return (currentNodeData.data.dataFrom! as TUpdateNodeParent).nodeId;
      case 'UPDATE_NODE_CONTENT':
        return currentNodeData.data.nodeFrom! as THistoryEventData;
      case 'UPDATE_TASK_INFORMATION':
        return currentNodeData.data.nodeFrom! as THistoryEventData;
      default:
        return CANNOT_FIND_NODE_ID;
    }
  },
});

export const historyMovingSpeedState = atom<number>({
  key: 'historyMovingSpeedAtom',
  default: 650,
});

export const isHistoryCalculatingState = atom<boolean>({
  key: 'isHistoryIsCalculatingAtom',
  default: false,
});
