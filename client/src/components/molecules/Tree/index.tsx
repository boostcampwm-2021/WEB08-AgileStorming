import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Node, PriorityIcon, UserIcon } from 'components/atoms';
import { Path, TempNode, UserFocusBox } from 'components/molecules';
import { ITaskFilters } from 'components/organisms/MindmapTree';
import { NodeContainer, ChildContainer, NodeDeleteBtn } from './style';
import { getNextMapState, mindmapState, TEMP_NODE_ID } from 'recoil/mindmap';
import { selectedNodeIdState } from 'recoil/node';
import { currentHistoryNodeIdState, isHistoryOpenState } from 'recoil/history';
import useHistoryEmitter from 'hooks/useHistoryEmitter';
import { TCoord, TRect, getCurrentCoord, getGap, getType, calcRect, Levels } from 'utils/helpers';
import { IMindmapData, IMindNode, IMindNodes } from 'types/mindmap';
import { assigneeFilterState, labelFilterState, sprintFilterState, userFocusNodeState, userListState } from 'recoil/project';

interface ITreeProps {
  nodeId: number;
  mindmapData: IMindmapData;
  parentCoord: TCoord | null;
  parentId?: number;
  handleDeleteBtnClick: (parentId: number, node: IMindNode) => void;
}

interface ICheckFilterProps {
  level: Levels;
  node: IMindNode;
  taskFilters: ITaskFilters;
}

interface IGetStatusProps {
  isRoot: boolean;
  level: Levels;
  mindNodes: IMindNodes;
  node: IMindNode;
}

const isFilteredTask = ({ level, node, taskFilters }: ICheckFilterProps) => {
  if (level !== 'TASK') return false;

  const { sprintId, assigneeId, labels } = node;
  if (!(sprintId || assigneeId || labels)) return false;

  const [sprintFilter, userFilter, labelFilter] = Object.values(taskFilters);
  if (!(sprintFilter || userFilter || labelFilter)) return false;

  return (
    (!sprintFilter || parseInt(sprintId + '') === sprintFilter) &&
    (!userFilter || assigneeId === userFilter) &&
    (!labelFilter || (labels && labels.includes(labelFilter)))
  );
};

//끔찍한 코드... 근데 방법이 없다. 리팩토링 때 절대 까먹지 않기 위해 주석을 지우지 않겠다..
const isAllTaskDone = (storyNode: IMindNode, mindNodes: IMindNodes) => {
  const doneTaskNumber = storyNode.children.filter((childId) => mindNodes.get(childId)?.status === 'Done').length;
  return storyNode.children.length === doneTaskNumber;
};

const getStatus = ({ isRoot, level, mindNodes, node }: IGetStatusProps) => {
  const { status, children } = node;
  if (isRoot) return 'To Do';
  if (level === 'TASK') return status ? status : 'To Do';
  if (level === 'STORY' && children.length) return isAllTaskDone(node, mindNodes) ? 'Done' : 'To Do';
};

const Tree: React.FC<ITreeProps> = ({ nodeId, mindmapData, parentCoord, parentId, handleDeleteBtnClick }) => {
  const taskFilters: ITaskFilters = {
    sprint: useRecoilValue(sprintFilterState),
    user: useRecoilValue(assigneeFilterState),
    label: useRecoilValue(labelFilterState),
  };
  const userList = useRecoilValue(userListState);
  const isHistoryOpen = useRecoilValue(isHistoryOpenState);
  const userFocusNode = useRecoilValue(userFocusNodeState);

  const focusingUsers = Array.from(userFocusNode.entries())
    .filter((entry) => entry[1] === nodeId)
    .map((entry) => userList[entry[0]])
    .slice(0, 3);
  const isFiltering = !!Object.values(taskFilters).reduce((acc, filter) => (acc += filter ? filter : ''), '');

  const { addNode } = useHistoryEmitter();
  const setMindmapData = useSetRecoilState(mindmapState);

  const [selectedNodeId, setSelectedNodeId] = useRecoilState(selectedNodeIdState);
  const isSelected = selectedNodeId === nodeId;

  const currentHistoryNodeId = useRecoilValue(currentHistoryNodeIdState);
  const isHistorySelected = currentHistoryNodeId === nodeId;

  const [coord, setCoord] = useState<TCoord | null>(null);
  const [rect, setRect] = useState<TRect | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { rootId, mindNodes } = mindmapData;
  const node = mindNodes.get(nodeId)!;
  const { level, content, children, assigneeId, priority } = node;
  const assignee = assigneeId ? userList[assigneeId] : null;
  const isRoot = nodeId === rootId;
  const isFiltered = isFiltering ? isFilteredTask({ level, node, taskFilters }) : true;

  const status = getStatus({ mindNodes, node, level, isRoot });

  useEffect(() => {
    if (!nodeRef.current || !containerRef.current) return;

    const currentNode: HTMLElement = nodeRef.current;
    const currentContainer: HTMLElement = containerRef.current;

    const currentCoord = getCurrentCoord(currentNode);
    const gap = getGap(currentContainer);

    setCoord(currentCoord);

    if (!parentCoord || !currentCoord || !gap) return;
    const type = getType({ parentCoord, currentCoord, gap });

    setRect(calcRect({ parentCoord, currentCoord, gap, type }));
  }, [parentCoord, mindNodes]);

  const removeTempNode = () => {
    const parent = mindNodes.get(parentId!);
    parent!.children = parent!.children.filter((childId) => childId !== nodeId);
    mindNodes.set(parentId!, parent!);
    mindNodes.delete(nodeId);
    const newMapData = getNextMapState({ rootId, mindNodes });
    setMindmapData(newMapData);
  };

  const addNewNode = (nodeContent: string) => {
    const payload = {
      nodeFrom: parentId!,
      dataTo: { content: nodeContent, level: level },
    };

    addNode(payload);
    setSelectedNodeId(null);
  };

  const handleNodeContentFocusout = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    const targetContent = currentTarget.value;

    if (targetContent) addNewNode(targetContent);
    removeTempNode();
  };

  const handleNodeContentEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const targetContent = event.currentTarget.value;

    if (targetContent) addNewNode(targetContent);
    removeTempNode();
  };

  useEffect(() => {
    if (isHistorySelected) {
      nodeRef.current?.scrollIntoView({ block: 'center', inline: 'center' });
    }
  }, [isHistorySelected]);

  return (
    <NodeContainer id={nodeId + 'container'} ref={containerRef} isRoot={isRoot} className='node-container mindmap-area'>
      {nodeId === TEMP_NODE_ID ? (
        <TempNode
          refProp={nodeRef}
          id={nodeId.toString()}
          isSelected={isSelected}
          level={level}
          onBlur={handleNodeContentFocusout}
          onKeyPress={handleNodeContentEnter}
        />
      ) : (
        <>
          <Node
            draggable={isRoot ? false : true}
            ref={nodeRef}
            id={nodeId.toString()}
            level={level}
            isSelected={(!isHistoryOpen && isSelected) || isHistorySelected}
            isFiltered={isFiltered}
            className='node mindmap-area'
            status={status}
          >
            {!!assignee && <UserIcon user={assignee} />}
            {!!priority && <PriorityIcon priority={priority} />}
            {!isHistoryOpen && !isRoot && isSelected && (
              <NodeDeleteBtn onClick={handleDeleteBtnClick.bind(null, parentId!, node)}>삭제</NodeDeleteBtn>
            )}
            {!isHistoryOpen && <UserFocusBox users={focusingUsers} />}
            {content}
          </Node>
        </>
      )}
      <ChildContainer className='child-container'>
        {children.map((childrenId) => (
          <Tree
            key={childrenId}
            nodeId={childrenId}
            mindmapData={mindmapData}
            parentCoord={coord}
            parentId={nodeId}
            handleDeleteBtnClick={handleDeleteBtnClick}
          />
        ))}
      </ChildContainer>
      <Path rect={rect} />
    </NodeContainer>
  );
};

export default Tree;
