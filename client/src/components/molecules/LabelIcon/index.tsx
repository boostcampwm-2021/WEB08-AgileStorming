import React from 'react';
import { StyledLabelIcon } from './style';
import { ILabel } from 'types/label';

export interface IProps {
  label: ILabel;
  active?: boolean;
  onClick?: () => void;
}

const LabelIcon: React.FC<IProps> = ({ label, active = true, onClick = () => {} }) => {
  return (
    <StyledLabelIcon label={label} active={active} onClick={onClick}>
      {label.name}
    </StyledLabelIcon>
  );
};

export default LabelIcon;
