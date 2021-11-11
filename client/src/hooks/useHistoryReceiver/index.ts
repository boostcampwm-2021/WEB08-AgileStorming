import { eventType } from 'hooks/useHistoryEmitter';
import { SetterOrUpdater } from 'recoil';
import { IHistories, IHistory } from 'recoil/history';
import { getNextMapState, IMindmapData } from 'recoil/mindmap';
import { INode } from 'recoil/node';

export interface IProps {
  mindmap: IMindmapData;
  setMindmap: SetterOrUpdater<IMindmapData>;
  setHistory: SetterOrUpdater<IHistories>;
}

export interface IHistoryReceiver {
  (props: IHistory): void;
}

const useHistoryReceiver = ({ mindmap, setMindmap, setHistory }: IProps) => {
  const historyReceiver = (history: IHistory) => {
    let {
      type,
      data: { nodeFrom, nodeTo, dataFrom, dataTo },
    } = history;
    const nextMapState = getNextMapState(mindmap);
    switch (type) {
      case eventType.ADD_NODE:
        break;
      case eventType.MOVE_NODE:
        const nextNodes = dataTo as INode[];
        nextNodes.forEach((node) => nextMapState.mindNodes.set(node.nodeId, { ...node, children: [...node.children] }));
        setMindmap(nextMapState);
        break;
      case eventType.DELETE_NODE:
        console.log(nodeFrom, nodeTo, dataFrom);
        break;
      default:
        break;
    }
    setHistory((prev) => ({ histories: [...prev.histories, history] }));
  };

  return historyReceiver;
};
export default useHistoryReceiver;
