import { useSetRecoilState } from 'recoil';
import { IMindmapData, mindmapState } from 'recoil/mindmap';
// import { Socket } from 'socket.io-client';
// let socket: Socket;

interface ISocketEmitterProps {
  eventName: string;
  history: Object;
  nextState: IMindmapData;
}

export interface ISocketEmitter {
  ({ eventName, history, nextState }: ISocketEmitterProps): void;
}

const useSocketEmitter = () => {
  const setMindMap = useSetRecoilState(mindmapState);

  const socketEmitter = ({ eventName, history, nextState }: ISocketEmitterProps) => {
    // 추후 소켓 연동 후 코드 수정
    switch (eventName) {
      case 'change':
        // socket.emit(eventName, history, (status:number) => {
        //   if(status===200)
        setMindMap(nextState as IMindmapData);
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
