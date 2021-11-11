import useToast from 'hooks/useToast';
import { IData } from 'recoil/history';

export interface IHistoryEmitter {
  (props: IHistoryEmitterProps): void;
}

export interface IHistoryEmitterProps {
  type: eventType;
  payload: IData;
}

export enum eventType {
  ADD_NODE = 'ADD_NODE',
  DELETE_NODE = 'DELETE_NODE',
  MOVE_NODE = 'MOVE_NODE',
  CHANGE_CONTENT = 'CHANGE_CONTENT',
  CHANGE_SPRINT = 'CHANGE_SPRINT',
  CHANGE_ASSIGNEE = 'CHANGE_ASSIGNEE',
  CHANGE_EXPECTED_AT = 'CHANGE_EXPECTED_AT',
  CHANGE_EXPECTED_TIME = 'CHANGE_EXPECTED_TIME',
  CHANGE_PRIORITY = 'CHANGE_PRIORITY',
}

const useHistoryEmitter = () => {
  const { showMessage } = useToast();

  const historyEmitter = ({ type, payload }: IHistoryEmitterProps) => {
    if (!window.socket) {
      showMessage('서버와의 연결이 불안정합니다');
      return;
    }
    window.socket.emit('event', type, JSON.stringify(payload));
  };

  const addNode = ({ nodeFrom, dataTo }: IData) => historyEmitter({ type: eventType.ADD_NODE, payload: { nodeFrom, dataTo } });
  const deleteNode = ({ nodeFrom, dataFrom }: IData) => historyEmitter({ type: eventType.DELETE_NODE, payload: { nodeFrom, dataFrom } });
  const moveNode = ({ nodeFrom, nodeTo, dataFrom, dataTo }: IData) =>
    historyEmitter({ type: eventType.MOVE_NODE, payload: { nodeFrom, nodeTo, dataFrom, dataTo } });
  const changeContent = ({ nodeFrom, dataFrom, dataTo }: IData) =>
    historyEmitter({ type: eventType.CHANGE_CONTENT, payload: { nodeFrom, dataFrom, dataTo } });
  const changeSprint = ({ nodeFrom, dataFrom, dataTo }: IData) =>
    historyEmitter({ type: eventType.CHANGE_SPRINT, payload: { nodeFrom, dataFrom, dataTo } });
  const changeAssignee = ({ nodeFrom, dataFrom, dataTo }: IData) =>
    historyEmitter({ type: eventType.CHANGE_ASSIGNEE, payload: { nodeFrom, dataFrom, dataTo } });
  const changeExpectedAt = ({ nodeFrom, dataFrom, dataTo }: IData) =>
    historyEmitter({ type: eventType.CHANGE_EXPECTED_AT, payload: { nodeFrom, dataFrom, dataTo } });
  const changeExpectedTime = ({ nodeFrom, dataFrom, dataTo }: IData) =>
    historyEmitter({ type: eventType.CHANGE_EXPECTED_TIME, payload: { nodeFrom, dataFrom, dataTo } });
  const changePriority = ({ nodeFrom, dataFrom, dataTo }: IData) =>
    historyEmitter({ type: eventType.CHANGE_PRIORITY, payload: { nodeFrom, dataFrom, dataTo } });

  return {
    addNode,
    deleteNode,
    moveNode,
    changeContent,
    changeSprint,
    changeAssignee,
    changeExpectedAt,
    changeExpectedTime,
    changePriority,
  };
};

export default useHistoryEmitter;
