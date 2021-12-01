import React from 'react';
import { Wrapper } from './style';
import { useRecoilValue } from 'recoil';
import { labelListState } from 'recoil/project';
import { LabelIcon } from 'components/atoms';

interface IProps {
  labelIds: number[];
  onChange?: (labelIds: number[]) => void;
}

const LabelList: React.FC<IProps> = ({ labelIds, onChange = () => {} }) => {
  const labelList = useRecoilValue(labelListState);

  const deactivatedLabelList = Object.values(labelList).filter(({ id }) => !labelIds.includes(id));

  const handleActivateLabel = (targetLabelId: number) => {
    const newLabelIds = [...labelIds, targetLabelId];
    onChange(newLabelIds);
  };

  const handleDeactivateLabel = (targetLabelId: number) => {
    const newLabelIds = labelIds.filter((labelId) => labelId !== targetLabelId);
    onChange(newLabelIds);
  };

  return (
    <Wrapper>
      {labelIds.map((labelId) => (
        <LabelIcon key={labelId} label={labelList[labelId]} onClick={() => handleDeactivateLabel(labelId)} />
      ))}
      {deactivatedLabelList.map((label) => (
        <LabelIcon key={label.id} label={label} active={false} onClick={() => handleActivateLabel(label.id)} />
      ))}
    </Wrapper>
  );
};

export default LabelList;
