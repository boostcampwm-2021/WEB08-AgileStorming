import useToast from 'hooks/useToast';
import {
  TAddLabel,
  TAddSprint,
  TDeleteLabel,
  TDeleteSprint,
  TEventData,
  TEventType,
  THistoryEventData,
  THistoryEventType,
} from 'types/event';
import { fillPayload } from 'utils/helpers';

export interface IHistoryEmitter {
  (props: IHistoryEmitterProps): void;
}

export interface IHistoryEmitterProps {
  type: THistoryEventType;
  payload: THistoryEventData;
}

export interface INonHistoryEmitterProps {
  type: TEventType;
  payload: TEventData;
}

const useSocketEmitter = () => {
  const { showError } = useToast();

  const isSocketConnected = () => {
    if (!window.socket) {
      showError(new Error('서버와의 연결이 불안정합니다'));
      return false;
    }
    return true;
  };

  const historyEmitter = ({ type, payload }: IHistoryEmitterProps) => {
    if (!isSocketConnected()) return;
    payload = fillPayload(payload);
    window.socket!.emit('history-event', type, JSON.stringify(payload));
  };

  const nonHistoryEmitter = ({ type, payload }: INonHistoryEmitterProps) => {
    if (!isSocketConnected()) return;
    window.socket!.emit('non-history-event', type, JSON.stringify(payload));
  };

  //* history-event
  const addNode = ({ nodeFrom, dataTo }: THistoryEventData) => historyEmitter({ type: 'ADD_NODE', payload: { nodeFrom, dataTo } });

  const deleteNode = ({ nodeFrom, dataFrom }: THistoryEventData) =>
    historyEmitter({ type: 'DELETE_NODE', payload: { nodeFrom, dataFrom } });

  const updateNodeParent = ({ nodeFrom, nodeTo, dataFrom, dataTo }: THistoryEventData) =>
    historyEmitter({ type: 'UPDATE_NODE_PARENT', payload: { nodeFrom, nodeTo, dataFrom, dataTo } });

  const updateNodeContent = ({ nodeFrom, dataFrom, dataTo }: THistoryEventData) =>
    historyEmitter({ type: 'UPDATE_NODE_CONTENT', payload: { nodeFrom, dataFrom, dataTo } });

  const updateTaskInformation = ({ nodeFrom, nodeTo, dataFrom, dataTo }: THistoryEventData) =>
    historyEmitter({ type: 'UPDATE_TASK_INFORMATION', payload: { nodeFrom, nodeTo, dataFrom, dataTo } });

  //* non-history-event
  const addLabel = ({ name }: TAddLabel) => nonHistoryEmitter({ type: 'ADD_LABEL', payload: { name } });
  const deleteLabel = ({ labelId }: TDeleteLabel) => nonHistoryEmitter({ type: 'DELETE_LABEL', payload: { labelId } });
  const addSprint = ({ name, startDate, endDate }: TAddSprint) =>
    nonHistoryEmitter({ type: 'ADD_SPRINT', payload: { name, startDate, endDate } });
  const deleteSprint = ({ sprintId }: TDeleteSprint) => nonHistoryEmitter({ type: 'DELETE_SPRINT', payload: { sprintId } });
  const focusNode = (nodeId: number | null) => {
    if (!isSocketConnected()) return;
    window.socket!.emit('user-focus', nodeId);
  };

  return {
    addNode,
    deleteNode,
    updateNodeParent,
    updateNodeContent,
    updateTaskInformation,
    addLabel,
    deleteLabel,
    addSprint,
    deleteSprint,
    focusNode,
  };
};

export default useSocketEmitter;
