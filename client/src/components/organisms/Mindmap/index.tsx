import React, { useEffect } from 'react';
import { IMindmapData, getNextMapState } from 'recoil/mindmap';
import useSocketEmitter, { ISocketEmitter } from 'hooks/useSocketEmit';
import MindmapTree from 'components/molecules/MindmapTree';

interface IProps {
  mindmapData: IMindmapData;
}

let dragged: HTMLElement;

const getRegexNumber = (nodeId: string) => {
  return Number(nodeId.replace(/[^0-9]/g, ''));
};

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
  if ((event.target as HTMLElement).id.match(/EPIC|STORY/)) {
    (event.target as HTMLElement).style.background = '';
    if (event.target) {
      const nextState = getNextMapState(mindmap);
      const targetId = getTargetId(dragged);
      const [oldParentId, newParentId] = [getParentId(dragged), getTargetId(event.target)];
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
    }
  }
};

const addDragEvent = (socketEmitter: ISocketEmitter, mindmap: IMindmapData) => {
  // document.addEventListener('drag', function (event) {}, false);
  window.addEventListener('dragstart', handleDragStartNode, false);
  window.addEventListener('dragend', handleDragEndNode, false);
  window.addEventListener('dragover', handleDragOverNode, false);
  window.addEventListener('dragenter', handleDragEnterNode, false);
  window.addEventListener('dragleave', handleDragLeaveNode, false);
  const bindhandleDropNode = handleDropNode.bind(null, mindmap, socketEmitter);
  window.addEventListener('drop', bindhandleDropNode, false);

  const removeCallback = () => {
    window.removeEventListener('dragstart', handleDragStartNode);
    window.removeEventListener('dragend', handleDragEndNode);
    window.removeEventListener('dragover', handleDragOverNode);
    window.removeEventListener('dragenter', handleDragEnterNode);
    window.removeEventListener('dragleave', handleDragLeaveNode);
    window.removeEventListener('drop', bindhandleDropNode);
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
