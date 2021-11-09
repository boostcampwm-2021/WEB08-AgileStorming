import React, { InputHTMLAttributes } from 'react';
import { StyledInput, TStyle } from './style';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  inputStyle?: TStyle;
  margin?: string;
}

const BoxButton: React.FC<IProps> = ({ inputStyle = 'normal', margin = '0.5rem 0', ...props }) => {
  return <StyledInput inputStyle={inputStyle} margin={margin} {...props} />;
};

export default BoxButton;
