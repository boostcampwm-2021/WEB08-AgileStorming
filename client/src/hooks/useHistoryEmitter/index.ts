import useToast from 'hooks/useToast';
import { IData } from 'recoil/history';
import { fillPayload } from 'utils/helpers';

export interface IHistoryEmitter {
  (props: IHistoryEmitterProps): void;
}

export interface IHistoryEmitterProps {
  type: EventType;
  payload: IData;
}

export enum EventType {
  ADD_NODE = 'ADD_NODE',
  MOVE_NODE = 'MOVE_NODE',
  DELETE_NODE = 'DELETE_NODE',
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

    payload = fillPayload(payload);

    window.socket.emit('event', type, JSON.stringify(payload));
  };

  const addNode = ({ nodeFrom, dataTo }: IData) => historyEmitter({ type: EventType.ADD_NODE, payload: { nodeFrom, dataTo } });

  const moveNode = ({ nodeFrom, nodeTo, dataFrom, dataTo }: IData) =>
    historyEmitter({ type: EventType.MOVE_NODE, payload: { nodeFrom, nodeTo, dataFrom, dataTo } });

  const deleteNode = ({ nodeFrom, dataFrom }: IData) => historyEmitter({ type: EventType.DELETE_NODE, payload: { nodeFrom, dataFrom } });

  const changeContent = ({ nodeFrom, dataFrom, dataTo }: IData) =>
    historyEmitter({ type: EventType.CHANGE_CONTENT, payload: { nodeFrom, dataFrom, dataTo } });

  const changeSprint = ({ nodeFrom, dataFrom, dataTo }: IData) =>
    historyEmitter({ type: EventType.CHANGE_SPRINT, payload: { nodeFrom, dataFrom, dataTo } });

  const changeAssignee = ({ nodeFrom, dataFrom, dataTo }: IData) =>
    historyEmitter({ type: EventType.CHANGE_ASSIGNEE, payload: { nodeFrom, dataFrom, dataTo } });

  const changeExpectedAt = ({ nodeFrom, dataFrom, dataTo }: IData) =>
    historyEmitter({ type: EventType.CHANGE_EXPECTED_AT, payload: { nodeFrom, dataFrom, dataTo } });

  const changeExpectedTime = ({ nodeFrom, dataFrom, dataTo }: IData) =>
    historyEmitter({ type: EventType.CHANGE_EXPECTED_TIME, payload: { nodeFrom, dataFrom, dataTo } });

  const changePriority = ({ nodeFrom, dataFrom, dataTo }: IData) =>
    historyEmitter({ type: EventType.CHANGE_PRIORITY, payload: { nodeFrom, dataFrom, dataTo } });

  return {
    addNode,
    moveNode,
    deleteNode,
    changeContent,
    changeSprint,
    changeAssignee,
    changeExpectedAt,
    changeExpectedTime,
    changePriority,
  };
};

export default useHistoryEmitter;
