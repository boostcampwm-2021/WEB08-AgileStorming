import { useSetRecoilState } from 'recoil';
import { IMindMap, mindMapState } from 'recoil/mindMap';
// import { Socket } from 'socket.io-client';
// let socket: Socket;

interface ISocketEmitterProps {
  eventName: string;
  history: Object;
  nextState: IMindMap;
}

export interface ISocketEmitter {
  ({ eventName, history, nextState }: ISocketEmitterProps): void;
}

const useSocketEmitter = () => {
  const setMindMap = useSetRecoilState(mindMapState);

  const socketEmitter = ({ eventName, history, nextState }: ISocketEmitterProps) => {
    // 추후 소켓 연동 후 코드 수정
    switch (eventName) {
      case 'change':
        // socket.emit(eventName, history, (status:number) => {
        //   if(status===200)
        setMindMap(nextState as IMindMap);
        //   else
        //     console.log('node change Error')
        // });
        break;
      default:
        break;
    }
  };

  return socketEmitter;
};
export default useSocketEmitter;
