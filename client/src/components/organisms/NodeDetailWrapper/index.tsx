import React, { useCallback } from 'react';
import { Label, PopupItemLayout, PopupLayout } from 'components/molecules';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedNodeState, INode } from 'recoil/node';
import { priorityListState } from 'recoil/meta-data';
import { Input } from 'components/atoms';
import Dropdown from 'components/molecules/Dropdown';

interface IProps {}

export const NodeDetailWrapper: React.FC<IProps> = () => {
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeState);
  const priorityList = useRecoilValue(priorityListState);

  const handleCloseButton = () => setSelectedNode(null);
  const handleBlurNodeDetail = useCallback(
    (info: keyof INode) => (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value === selectedNode?.[info]) {
        return;
      }
      //! 노드 내용 변경 요청
    },
    [selectedNode]
  );
  const handleChangeNodeDetail = useCallback(
    (info: keyof INode) => (value: string) => {
      if (value === selectedNode?.[info]) {
        return;
      }
      //! 노드 내용 변경 요청
    },
    [selectedNode]
  );

  return selectedNode === null ? null : (
    <PopupLayout title={selectedNode.backlogId} onClose={handleCloseButton} popupStyle='normal'>
      <PopupItemLayout title={'내용'}>
        <Input inputStyle='gray' onBlur={handleBlurNodeDetail('content')} defaultValue={selectedNode.content} margin='0.2rem 0 0 0'></Input>
      </PopupItemLayout>
      <PopupItemLayout title={'세부사항'}>
        <Label label='스프린트' labelStyle='small' ratio={0.5} htmlFor='sprint'>
          <Input inputStyle='small' id='sprint' margin='0.1rem 0'></Input>
        </Label>
        <Label label='담당자' labelStyle='small' ratio={0.5} htmlFor='assignee'>
          <Input inputStyle='small' id='assignee' margin='0.1rem 0'></Input>
        </Label>
        <Label label='마감 시간' labelStyle='small' ratio={0.5} htmlFor='expectedAt'>
          <Input inputStyle='small' id='expectedAt' margin='0.1rem 0'></Input>
        </Label>
        <Label label='예상 소요 시간' labelStyle='small' ratio={0.5} htmlFor='expectedTime'>
          <Input inputStyle='small' id='expectedTime' margin='0.1rem 0'></Input>
        </Label>
        <Label label='중요도' labelStyle='small' ratio={0.5} htmlFor='priority'>
          <Dropdown
            dropdownStyle='small'
            items={priorityList}
            value={selectedNode.priority}
            onValueChange={handleChangeNodeDetail('priority')}
          />
        </Label>
      </PopupItemLayout>
      <PopupItemLayout title={'라벨'}>라벨정보</PopupItemLayout>
    </PopupLayout>
  );
};

export default NodeDetailWrapper;
