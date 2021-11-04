import React, { useEffect } from 'react';
import { IMindmapData, getNextMapState } from 'recoil/mindmap';
import useSocketEmitter, { ISocketEmitter } from 'hooks/useSocketEmit';
import MindmapTree from 'components/molecules/MindmapTree';
import { getRegexNumber } from 'utils/helpers';

interface IProps {
  mindmapData: IMindmapData;
}

let dragged: HTMLElement;

const getTargetId = (element: EventTarget) => {
  return getRegexNumber((element as HTMLElement).id);
};

const getParentId = (element: HTMLElement) => {
  if (element.parentNode?.parentNode) {
    const currentParent = element.parentNode.parentNode as HTMLElement;
    if (currentParent.id) return getTargetId(currentParent);
  }
  return 0;
};

const isDraggable = (event: MouseEvent) => {
  return (event.target as HTMLElement).id.match(/EPIC|STORY|TASK/);
};

const handleDragStartNode = (event: MouseEvent) => {
  dragged = event.target as HTMLElement;
  (event.target as HTMLElement).style.opacity = '0.5';
};
const handleDragEndNode = (event: MouseEvent) => {
  (event.target as HTMLElement).style.opacity = '';
};
const handleDragOverNode = (event: MouseEvent) => {
  event.preventDefault();
};
const handleDragEnterNode = (event: MouseEvent) => {
  if ((event.target as HTMLElement).id.match(/EPIC|STORY/)) {
    console.log((event.target as HTMLElement).id);
    (event.target as HTMLElement).style.background = 'purple';
  }
};
const handleDragLeaveNode = (event: MouseEvent) => {
  if ((event.target as HTMLElement).id.match(/EPIC|STORY/)) {
    (event.target as HTMLElement).style.background = '';
  }
};
const handleDropNode = (mindmap: IMindmapData, socketEmitter: ISocketEmitter, event: MouseEvent) => {
  event.preventDefault();
  const target = event.target as HTMLElement;
  if (target && target.id.match(/EPIC|STORY/)) {
    target.style.background = '';
    changeNodeParent(mindmap, socketEmitter, target);
  }
};

const changeNodeParent = (mindmap: IMindmapData, socketEmitter: ISocketEmitter, target: HTMLElement) => {
  const nextState = getNextMapState(mindmap);
  const targetId = getTargetId(dragged);
  const [oldParentId, newParentId] = [getParentId(dragged), getTargetId(target)];
  if (oldParentId === newParentId) return;
  const [oldParentNode, newParentNode] = [nextState.mindNodes.get(oldParentId), nextState.mindNodes.get(newParentId)];
  if (oldParentNode && newParentNode) {
    oldParentNode.children = oldParentNode.children.filter((v) => v !== targetId);
    newParentNode.children.push(targetId);
    const history = {
      oldNode: oldParentNode,
      newNode: newParentNode,
    };
    socketEmitter({ eventName: 'change', history: history, nextState: nextState });
  }
};

const addDragEvent = (socketEmitter: ISocketEmitter, mindmap: IMindmapData) => {
  const bindhandleDropNode = handleDropNode.bind(null, mindmap, socketEmitter);
  const dragEvents = [
    ['dragstart', handleDragStartNode],
    ['dragend', handleDragEndNode],
    ['dragover', handleDragOverNode],
    ['dragenter', handleDragEnterNode],
    ['dragleave', handleDragLeaveNode],
    ['drop', bindhandleDropNode],
  ];
  //아 이거 handler type이 도대체 뭘까요.. 일단 any 넣었음
  dragEvents.forEach(([eventname, handler]: (string | any)[]) => window.addEventListener(eventname, handler, false));

  const removeCallback = () => {
    dragEvents.forEach(([eventname, handler]: (string | any)[]) => window.removeEventListener(eventname, handler));
  };
  return removeCallback;
};

const MindMap: React.FC<IProps> = ({ mindmapData }) => {
  const socketEmitter = useSocketEmitter();

  useEffect(() => {
    const removeDragEvent = addDragEvent(socketEmitter, mindmapData);
    return () => removeDragEvent();
  }, [socketEmitter, mindmapData]);

  return (
    <>
      <MindmapTree mindmapData={mindmapData} />
    </>
  );
};

//event 적용
//useMemo 적용
//svg 연결
//노드 추가 미리보기
export default MindMap;
