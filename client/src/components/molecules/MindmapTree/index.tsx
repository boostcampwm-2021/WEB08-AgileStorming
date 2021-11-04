import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { IMindNode, IMindMap, getNextMapState, IMindNodes } from 'recoil/mindMap';
import Node from 'components/atoms/Node';
import useSocketEmitter, { ISocketEmitter } from 'hooks/useSocketEmit';

interface IProps {
  mindMap: IMindMap;
}

interface ITreeProps {
  nodeId: number;
  mindNodes: IMindNodes;
}

interface ISvgTreeProps {
  positions: { nodeId: [] };
  nodeId: number;
  mindNodes: IMindNodes;
}

interface IStyleProps {
  isRoot: boolean;
}

const NodeContainer = styled.div<IStyleProps>`
  ${(props) => props.theme.flex.row};
  align-items: center;
  ${(props) => props.isRoot && props.theme.absoluteCenter};
  gap: 1rem;
  border: 1px solid blue;
`;

const ChildContainer = styled.div`
  ${(props) => props.theme.flex.column};
  gap: 1rem;
`;

const Tree: React.FC<ITreeProps> = ({ nodeId, mindNodes }) => {
  const isRoot = nodeId === 0;
  const node = mindNodes.get(nodeId);
  const { level, content, children } = node!;
  const id = `${level}#${nodeId}`;
  return (
    <NodeContainer id={id} isRoot={isRoot} draggable='true'>
      <Node id={id} level={level}>
        {content}
      </Node>
      <ChildContainer>
        {children.map((childrenId) => (
          <Tree key={childrenId} nodeId={childrenId} mindNodes={mindNodes} />
        ))}
      </ChildContainer>
    </NodeContainer>
  );
};

// const SvgTree: React.FC<ISvgTreeProps> = ({ positions, nodeId, mindNodes }) => {

//   return (

//   );
// };

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
const handleDropNode = (mindMap: IMindMap, socketEmitter: ISocketEmitter, event: MouseEvent) => {
  console.log('@@@@', event);
  event.preventDefault();
  if ((event.target as HTMLElement).id.match(/EPIC|STORY/)) {
    (event.target as HTMLElement).style.background = '';
    if (event.target) {
      const nextState = getNextMapState(mindMap);
      const targetId = getTargetId(dragged);
      const [oldParentId, newParentId] = [getParentId(dragged), getTargetId(event.target)];
      if (oldParentId === newParentId) return;
      const [oldParentNode, newParentNode] = [nextState.mindNodes.get(oldParentId), nextState.mindNodes.get(newParentId)];
      if (oldParentNode && newParentNode) {
        oldParentNode.children = oldParentNode.children.filter((v) => v !== targetId);
        newParentNode.children.push(targetId);
        console.log(targetId);
        console.log(oldParentId, newParentId);
        const history = {
          oldNode: oldParentNode,
          newNode: newParentNode,
        };
        socketEmitter({ eventName: 'change', history: history, nextState: nextState });
      }
    }
  }
};
const addDragEvent = (socketEmitter: ISocketEmitter, mindMap: IMindMap) => {
  // document.addEventListener('drag', function (event) {}, false);
  window.addEventListener('dragstart', handleDragStartNode, false);
  window.addEventListener('dragend', handleDragEndNode, false);
  window.addEventListener('dragover', handleDragOverNode, false);
  window.addEventListener('dragenter', handleDragEnterNode, false);
  window.addEventListener('dragleave', handleDragLeaveNode, false);
  const bindhandleDropNode = handleDropNode.bind(null, mindMap, socketEmitter);
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

const MindMapTree: React.FC<IProps> = ({ mindMap }) => {
  const { rootId, mindNodes } = mindMap;
  const socketEmitter = useSocketEmitter();
  // const [nodePositions, setNodePositions] = useState({});
  // useEffect(() => {
  //   const positions = getPositions(mindNodes);
  //   setNodePositions(positions);
  // }, [mindNodes]);
  useEffect(() => {
    const removeDragEvent = addDragEvent(socketEmitter, mindMap);
    return () => removeDragEvent();
  }, [socketEmitter, mindMap]);

  return (
    <>
      <Tree key={rootId} nodeId={rootId} mindNodes={mindNodes} />
      {/* <SvgTree positions={nodePositions} nodeId={rootId} mindNodes={mindNodes} /> */}
    </>
  );
};

//event 적용
//useMemo 적용
//svg 연결
//노드 추가 미리보기
export default MindMapTree;
