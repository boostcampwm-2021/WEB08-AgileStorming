import React from 'react';
import styled from '@emotion/styled';
import { SmallText } from 'components/atoms';
import { ILabel } from 'types/label';

interface IProps {
  label: ILabel;
}

const StyledLabelIcon = styled.div<IProps>`
  background-color: ${({ label }) => `#${label.color}`};
`;
const LabelIcon: React.FC<IProps> = ({ label }) => {
  return (
    <StyledLabelIcon label={label}>
      <SmallText color={'white'}>{label.name}</SmallText>;
    </StyledLabelIcon>
  );
};

export default LabelIcon;
