import React from 'react';
import { StyledTransparentButton } from './style';

interface IProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  margin?: string;
  zIdx?: string;
}

const TransparentButton: React.FC<IProps> = ({ children, onClick, margin = '0', zIdx = '0' }) => {
  return (
    <StyledTransparentButton onClick={onClick} margin={margin} zIdx={zIdx}>
      {children}
    </StyledTransparentButton>
  );
};

export default TransparentButton;
