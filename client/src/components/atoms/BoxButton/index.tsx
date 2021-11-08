import React from 'react';
import { StyledButton, TColor, TStyle } from './style';

interface IProps {
  onClick: React.MouseEventHandler;
  children?: React.ReactNode;
  btnStyle?: TStyle;
  color?: TColor;
  margin?: string;
}

const BoxButton: React.FC<IProps> = ({ children, onClick, margin = '0.5rem', color = 'white', btnStyle = 'normal' }) => {
  return (
    <div>
      <StyledButton onClick={onClick} btnStyle={btnStyle} color={color} margin={margin}>
        {children}
      </StyledButton>
    </div>
  );
};

export default BoxButton;
