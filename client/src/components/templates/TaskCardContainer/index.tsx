import React from 'react';
import styled from '@emotion/styled';
import { IMindNode } from 'types/mindmap';
import { TaskCard } from 'components/organisms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedNodeIdState } from 'recoil/node';
import { mindmapState } from 'recoil/mindmap';
import useHistoryEmitter from 'hooks/useHistoryEmitter';

const StyledTaskCardContainer = styled.div`
  ${(props) => props.theme.flex.column}
  margin: 90px 10px 0 10px;
  width: 30vw;
  min-width: 300px;
  height: 88vh;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.color.primary1};
  border-radius: 8px;
  -webkit-box-shadow: 1px 4px 11px -1px rgba(0, 0, 0, 0.4);
  box-shadow: 1px 4px 11px -1px rgba(0, 0, 0, 0.4);
`;
const StyledTitle = styled.div`
  position: sticky;
  align-self: flex-start;
  text-align: center;
  top: 0%;
  width: 30vw;
  padding: 2vh;
  background-color: ${({ theme }) => theme.color.primary1};
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: bold;
  color: ${({ theme }) => theme.color.white};
`;

interface IProps {
  taskList: IMindNode[];
  status: 'To Do' | 'In Progress' | 'Done';
}

const TaskCardContainer: React.FC<IProps> = ({ taskList, status }) => {
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState);
  const { mindNodes } = useRecoilValue(mindmapState);
  const { updateTaskInformation } = useHistoryEmitter();
  const handleOnDoubleClickTask = (nodeId: number) => {
    setSelectedNodeId(nodeId);
  };
  let clicks = 0;
  let dragTimeOut: NodeJS.Timeout;
  const handleMouseDown = (e: React.MouseEvent<HTMLElement>, nodeId: number) => {
    e.preventDefault();
    const { currentTarget } = e;
    clicks++;
    if (clicks === 1) {
      dragTimeOut = setTimeout(() => {
        clicks = 0;
        drag(e, currentTarget, nodeId);
      }, 200);
    }
    if (clicks === 2) {
      clearTimeout(dragTimeOut);
      clicks = 0;
    }
  };
  const moveAt = (clone: HTMLElement, pageX: number, pageY: number) => {
    clone.style.left = pageX - clone.offsetWidth / 2 + 'px';
    clone.style.top = pageY - clone.offsetHeight / 2 + 'px';
  };
  const onMouseMove = (clone: HTMLElement, event: MouseEvent) => {
    moveAt(clone, event.pageX, event.pageY);
  };
  const onMouseUp = (clone: HTMLElement, nodeId: number, mouseMove: (event: MouseEvent) => void, event: MouseEvent) => {
    clone.style.display = 'none';
    const elemBelow = document.elementFromPoint(event.clientX, event.clientY)! as HTMLElement;
    const container = elemBelow.closest('.CardContainer')! as HTMLDivElement;
    const currentTask = mindNodes.get(nodeId)!;
    if (currentTask.status !== container.dataset.status) {
      updateTaskInformation({
        nodeFrom: nodeId,
        nodeTo: nodeId,
        dataFrom: { changed: { status: currentTask.status } },
        dataTo: { changed: { status: container.dataset.status as 'To Do' | 'In Progress' | 'Done' } },
      });
    }
    document.removeEventListener('mousemove', mouseMove);
    clone.remove();
  };
  const drag = (e: React.MouseEvent<HTMLElement>, currentTarget: HTMLElement, nodeId: number) => {
    if (e.buttons !== 1) return;
    const clone = currentTarget.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.zIndex = '1000';
    document.body.append(clone);
    moveAt(clone, e.pageX, e.pageY);
    const mouseMove = (event: MouseEvent) => onMouseMove(clone, event);
    document.addEventListener('mousemove', mouseMove);
    clone.addEventListener('mouseup', (event: MouseEvent) => onMouseUp(clone, nodeId, mouseMove, event));
  };

  return (
    <StyledTaskCardContainer className='CardContainer' data-status={status}>
      <StyledTitle>{status}</StyledTitle>
      {taskList.map((task) => (
        <TaskCard
          key={task.nodeId}
          taskInfo={task}
          onDoubleClickTask={() => handleOnDoubleClickTask(task.nodeId)}
          onMouseDownTask={(e: React.MouseEvent<HTMLElement>) => handleMouseDown(e, task.nodeId)}
        ></TaskCard>
      ))}
    </StyledTaskCardContainer>
  );
};

export default TaskCardContainer;
