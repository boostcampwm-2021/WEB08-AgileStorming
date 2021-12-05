import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Input, ScrollBox } from 'components/atoms';
import { LabelLayout, PopupItemLayout, PopupLayout, Dropdown } from 'components/molecules';
import { LabelList } from 'components/organisms';
import useSocketEmitter from 'hooks/useSocketEmitter';
import useToast from 'hooks/useToast';
import { priorityListState } from 'recoil/meta-data';
import { selectedNodeState, selectedNodeIdState } from 'recoil/node';
import { sprintListState, userListState } from 'recoil/project';
import { TTask } from 'types/event';
import { IMindNode } from 'types/mindmap';
import { isISODate, isPositiveNumber } from 'utils/form';

export const NodeDetailWrapper = () => {
  const priorityList = useRecoilValue(priorityListState);
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState);
  const selectedNode = useRecoilValue(selectedNodeState);
  const sprintList = useRecoilValue(sprintListState);
  const userList = useRecoilValue(userListState);

  const { showMessage } = useToast();
  const { updateNodeContent, updateTaskInformation } = useSocketEmitter();

  const priorityDropdownItem: Record<string, string> = {};
  priorityList.forEach((priority) => (priorityDropdownItem[priority] = priority));

  const sprintDropdownItem: Record<number, string> = {};
  Object.values(sprintList).forEach((sprint) => (sprintDropdownItem[sprint.id] = sprint.name));

  const uerDropdownItem: Record<string, string> = {};
  Object.values(userList).forEach((user) => (uerDropdownItem[user.id] = user.name));

  const handleCloseButton = () => setSelectedNodeId(null);

  const handleBlurNodeDetail = (info: keyof IMindNode) => (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === selectedNode?.[info]) return;
    const { nodeId, content } = selectedNode!;
    updateNodeContent({ nodeFrom: nodeId, dataFrom: { content: content }, dataTo: { content: e.target.value } });
    showMessage(`${info} ${e.target.value}로 변경.`);
  };

  const handleChangeNodeDetail = (info: keyof TTask) => (value: number | string) => {
    const prevValue = selectedNode![info];
    if (value === prevValue) return;
    updateTaskInformation({
      nodeFrom: selectedNode!.nodeId,
      dataFrom: { changed: { [info]: prevValue } },
      dataTo: { changed: { [info]: value } },
    });
  };

  const handleBlurDueDate = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    if (!target.value) return;
    if (!isISODate(target.value)) {
      showMessage('YYYY-MM-DD 형식으로 입력하세요.');
      return;
    }
    const prevValue = selectedNode!.dueDate;
    if (target.value !== prevValue) {
      updateTaskInformation({
        nodeFrom: selectedNode!.nodeId,
        dataFrom: { changed: { dueDate: prevValue } },
        dataTo: { changed: { dueDate: target.value } },
      });
      showMessage(`마감 날짜 ${target.value}으로 변경.`);
      return;
    }
  };

  const handleBlurEstimatedTime = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    if (!target.value) {
      return;
    }
    if (!isPositiveNumber(target.value)) {
      showMessage('숫자만 입력하세요. 단위는 시(hour)입니다.');
      return;
    }
    if (target.value !== selectedNode!.estimatedTime) {
      updateTaskInformation({
        nodeFrom: selectedNode!.nodeId,
        dataFrom: { changed: { estimatedTime: selectedNode!.estimatedTime } },
        dataTo: { changed: { estimatedTime: target.value } },
      });
      showMessage(`예상 소요 시간 ${target.value}으로 변경.`);
      return;
    }
  };

  const handleBlurFinishedTime = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    if (!target.value) {
      return;
    }
    if (!isPositiveNumber(target.value)) {
      showMessage('숫자만 입력하세요. 단위는 시(hour)입니다.');
      return;
    }
    if (target.value !== selectedNode!.finishedTime) {
      updateTaskInformation({
        nodeFrom: selectedNode!.nodeId,
        dataFrom: { changed: { finishedTime: selectedNode!.finishedTime } },
        dataTo: { changed: { finishedTime: target.value } },
      });
      showMessage(`실제 소요 시간 ${target.value}으로 변경.`);
      return;
    }
  };

  const requestLabelChange = (newLabelList: number[]) => {
    updateTaskInformation({
      nodeFrom: selectedNode!.nodeId,
      dataFrom: { changed: { labelIds: selectedNode!.labelIds ? selectedNode!.labelIds : '[]' } },
      dataTo: { changed: { labelIds: JSON.stringify(newLabelList) } },
    });
  };

  if (!selectedNode) {
    return null;
  }

  const NodeDetailContent = () => (
    <PopupItemLayout title={'내용'}>
      <Input
        key={selectedNode.content}
        defaultValue={selectedNode.content}
        onBlur={handleBlurNodeDetail('content')}
        inputStyle='gray'
        margin='0.2rem 0 0 0'
        useEnter={true}
      />
    </PopupItemLayout>
  );

  if (selectedNode.level !== 'TASK') {
    return (
      <PopupLayout title={`#${String(selectedNode.nodeId)}`} onClose={handleCloseButton} popupStyle='normal'>
        <NodeDetailContent />
      </PopupLayout>
    );
  }

  return (
    <PopupLayout title={`#${String(selectedNode.nodeId)}`} onClose={handleCloseButton} popupStyle='normal'>
      <NodeDetailContent />
      <PopupItemLayout title={'세부사항'}>
        <LabelLayout label='스프린트' labelStyle='small' ratio={0.5} htmlFor='sprint'>
          <Dropdown
            id='sprint'
            key={selectedNode.sprintId}
            items={sprintDropdownItem}
            placeholder={selectedNode.sprintId && sprintList[selectedNode.sprintId] ? sprintList[selectedNode.sprintId].name : ''}
            onValueChange={handleChangeNodeDetail('sprintId')}
            dropdownStyle='small'
            margin='0.1rem 0'
          />
        </LabelLayout>
        <LabelLayout label='담당자' labelStyle='small' ratio={0.5} htmlFor='assignee'>
          <Dropdown
            id='assignee'
            key={selectedNode.assigneeId}
            items={uerDropdownItem}
            placeholder={selectedNode.assigneeId ? userList[selectedNode.assigneeId].name : ''}
            onValueChange={handleChangeNodeDetail('assigneeId')}
            dropdownStyle='small'
            margin='0.1rem 0'
          />
        </LabelLayout>
        <LabelLayout label='마감 날짜' labelStyle='small' ratio={0.5} htmlFor='dueDate'>
          <Input
            id='dueDate'
            key={selectedNode.nodeId}
            placeholder={selectedNode.dueDate}
            onFocus={() => showMessage('YYYY-MM-DD 형식으로 입력하세요.')}
            onBlur={handleBlurDueDate}
            inputStyle='small'
            margin='0.1rem 0'
            useEnter={true}
          />
        </LabelLayout>
        <LabelLayout label='예상 소요 시간' labelStyle='small' ratio={0.5} htmlFor='estimatedTime'>
          <Input
            id='estimatedTime'
            key={selectedNode.estimatedTime}
            placeholder={selectedNode.estimatedTime ? `${selectedNode.estimatedTime}시간` : ''}
            onFocus={() => showMessage('숫자만 입력하세요. 단위는 시(hour)입니다.')}
            onBlur={handleBlurEstimatedTime}
            inputStyle='small'
            margin='0.1rem 0'
            useEnter={true}
          />
        </LabelLayout>
        <LabelLayout label='실제 소요 시간' labelStyle='small' ratio={0.5} htmlFor='finishedTime'>
          <Input
            id='finishedTime'
            key={selectedNode.finishedTime}
            placeholder={selectedNode.finishedTime ? `${selectedNode.finishedTime}시간` : ''}
            onFocus={() => showMessage('숫자만 입력하세요. 단위는 시(hour)입니다.')}
            onBlur={handleBlurFinishedTime}
            inputStyle='small'
            margin='0.1rem 0'
            useEnter={true}
          />
        </LabelLayout>
        <LabelLayout label='중요도' htmlFor='priority' labelStyle='small' ratio={0.5}>
          <Dropdown
            id='priority'
            key={selectedNode.nodeId}
            items={priorityDropdownItem}
            placeholder={selectedNode.priority}
            onValueChange={handleChangeNodeDetail('priority')}
            dropdownStyle='small'
            margin='0.1rem 0'
          />
        </LabelLayout>
      </PopupItemLayout>
      <PopupItemLayout title={'라벨'}>
        <ScrollBox>
          <LabelList labelIds={JSON.parse(selectedNode.labelIds ?? '[]')} onChange={requestLabelChange} />
        </ScrollBox>
      </PopupItemLayout>
    </PopupLayout>
  );
};

export default NodeDetailWrapper;
