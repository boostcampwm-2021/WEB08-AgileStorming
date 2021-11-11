import React, { LabelHTMLAttributes } from 'react';
import { StyledLabel, Wrapper, TStyle } from './style';

interface IProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  children?: React.ReactNode;
  labelStyle?: TStyle;
  ratio?: number;
  margin?: string;
}

const Label: React.FC<IProps> = ({ children, label, ratio, labelStyle = 'normal', margin = '0', ...props }) => {
  return (
    <Wrapper labelStyle={labelStyle} margin={margin} ratio={ratio}>
      <StyledLabel labelStyle={labelStyle} {...props}>
        {label}
      </StyledLabel>
      {children}
    </Wrapper>
  );
};

export default Label;
