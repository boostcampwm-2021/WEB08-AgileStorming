import styled from '@emotion/styled';
import React, { ChangeEvent, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TaskCard } from 'components/organisms';
import useModal from 'hooks/useModal';
import useHistoryEmitter from 'hooks/useSocketEmitter';
import useToast from 'hooks/useToast';
import { mindmapState } from 'recoil/mindmap';
import { selectedNodeIdState } from 'recoil/node';
import { TStatus, TTask } from 'types/event';
import { IMindNode } from 'types/mindmap';
import { IUser } from 'types/user';
import { isNumber } from 'utils/form';

const StyledTaskCardContainer = styled.div`
  ${(props) => props.theme.flex.column}
  margin: 90px 10px 0 10px;
  width: 30vw;
  min-width: 300px;
  height: 88vh;
  overflow-x: clip;
  overflow-y: overlay;
  background-color: ${({ theme }) => theme.color.primary1};
  border-radius: 8px;
  -webkit-box-shadow: 1px 4px 11px -1px rgba(0, 0, 0, 0.4);
  box-shadow: 1px 4px 11px -1px rgba(0, 0, 0, 0.4);
  ${({ theme }) => theme.customScrollbar.primary2};
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
  user: IUser;
}

const TaskCardContainer: React.FC<IProps> = ({ taskList, status, user }) => {
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState);
  const { mindNodes } = useRecoilValue(mindmapState);
  const { updateTaskInformation } = useHistoryEmitter();
  const { showMessage } = useToast();
  const { showModal, hideModal } = useModal();
  const finishedTime = useRef('');
  const mousedownFired = useRef(false);
  const clicks = useRef(0);
  const dragTimeOut = useRef<NodeJS.Timeout | null>(null);
  const setSelectedNodeIdTask = (nodeId: number) => {
    if (mousedownFired) {
      mousedownFired.current = false;
      setSelectedNodeId(nodeId);
      return;
    }
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLElement>, nodeId: number) => {
    e.preventDefault();
    mousedownFired.current = true;
    const { currentTarget } = e;
    clicks.current++;
    if (clicks.current === 1) {
      dragTimeOut.current = setTimeout(() => {
        clicks.current = 0;
        if (mousedownFired.current) onDragStart(e, currentTarget, nodeId);
      }, 200);
    }
    if (clicks.current === 2) {
      clearTimeout(dragTimeOut.current!);
      clicks.current = 0;
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
    if (container && currentTask.status !== container.dataset.status) {
      changeTaskStatus(nodeId, currentTask.status, container.dataset.status as 'To Do' | 'In Progress' | 'Done');
    }
    document.removeEventListener('mousemove', mouseMove);
    clone.remove();
  };
  const onDragStart = (e: React.MouseEvent<HTMLElement>, currentTarget: HTMLElement, nodeId: number) => {
    if (e.buttons !== 1) return;
    if (user?.id !== mindNodes.get(nodeId)?.assigneeId) {
      showMessage('자신에게 할당된 Task만 이동할 수 있습니다.');
      return;
    }
    const clone = currentTarget.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.zIndex = '1000';
    document.body.append(clone);
    moveAt(clone, e.pageX, e.pageY);
    const mouseMove = (event: MouseEvent) => onMouseMove(clone, event);
    document.addEventListener('mousemove', mouseMove);
    clone.addEventListener('mouseup', (event: MouseEvent) => onMouseUp(clone, nodeId, mouseMove, event));
  };
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isNumber(event.target.value)) {
      finishedTime.current = '';
      showMessage('숫자만 입력하세요. 단위는 시(hour)입니다.');
      return;
    }
    finishedTime.current = event.target.value;
  };
  const handleClickSubmitButton = (nodeId: number, statusBefore: TStatus | undefined, changed: TTask) => {
    if (!finishedTime.current) {
      showMessage('올바르지 않은 입력값입니다.');
      return;
    }
    changed.startDate = undefined;
    changed.finishedTime = finishedTime.current;
    changed.endDate = new Date().toISOString().split('T')[0];
    updateTaskInformation({
      nodeFrom: nodeId,
      nodeTo: nodeId,
      dataFrom: { changed: { status: statusBefore } },
      dataTo: { changed },
    });
    hideModal();
    return;
  };
  const changeTaskStatus = (nodeId: number, statusBefore: TStatus | undefined, statusAfter: TStatus) => {
    const changed: TTask = {
      status: statusAfter,
      finishedTime: null,
      startDate: null,
      endDate: null,
    };
    if (statusAfter === 'Done') {
      showModal({
        modalType: 'textInputModal',
        modalProps: {
          title: 'Task 완료 시간 입력',
          text: 'Task를 완료하는데 걸린 시간을 입력해주세요',
          placeholder: '시간',
          onChangeInput: handleChangeInput,
          onClickSubmitButton: () => handleClickSubmitButton(nodeId, statusBefore, changed),
        },
      });
      return;
    }
    if (statusAfter === 'In Progress') {
      changed.startDate = new Date().toISOString().split('T')[0];
    }
    updateTaskInformation({
      nodeFrom: nodeId,
      nodeTo: nodeId,
      dataFrom: { changed: { status: statusBefore } },
      dataTo: { changed },
    });
  };

  return (
    <StyledTaskCardContainer className='CardContainer' data-status={status}>
      <StyledTitle>{status}</StyledTitle>
      {taskList.map((task) => (
        <TaskCard
          key={task.nodeId}
          taskInfo={task}
          setSelectedNodeIdTask={() => setSelectedNodeIdTask(task.nodeId)}
          onMouseDownTask={(e: React.MouseEvent<HTMLElement>) => handleMouseDown(e, task.nodeId)}
        ></TaskCard>
      ))}
    </StyledTaskCardContainer>
  );
};

export default TaskCardContainer;
