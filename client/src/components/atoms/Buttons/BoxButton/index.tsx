import React, { ButtonHTMLAttributes } from 'react';
import { StyledButton, TColor, TStyle } from './style';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  btnStyle?: TStyle;
  color?: TColor;
  margin?: string;
}

const BoxButton: React.FC<IProps> = ({ children, margin = '0.5rem 0', color = 'white', btnStyle = 'normal', ...props }) => {
  return (
    <StyledButton btnStyle={btnStyle} color={color} margin={margin} {...props}>
      {children}
    </StyledButton>
  );
};

export default BoxButton;
