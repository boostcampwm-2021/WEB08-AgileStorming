import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  margin?: string;
  zIdx?: string;
}

interface IStyledProps {
  margin: string;
  zIdx: string;
}

const StyledTransparentButton = styled.button<IStyledProps>`
  border: none;
  background: transparent;
  margin: ${({ margin }) => margin};
  z-index: ${({ zIdx }) => zIdx};
  padding: 0;
  width: fit-content;
  cursor: pointer;
`;
const TransparentButton: React.FC<IProps> = ({ children, onClick, margin = '0', zIdx = '0' }) => {
  return (
    <StyledTransparentButton onClick={onClick} margin={margin} zIdx={zIdx}>
      {children}
    </StyledTransparentButton>
  );
};

export default TransparentButton;
