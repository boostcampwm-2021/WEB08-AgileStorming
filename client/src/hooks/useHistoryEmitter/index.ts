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

  return historyEmitter;
};
export default useHistoryEmitter;
