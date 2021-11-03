import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledTransparentButton = styled.button`
  border: none;
  background: transparent;
  margin: 0;
  padding: 0;
  width: fit-content;
`;
const TransparentButton: React.FC<IProps> = ({ children, onClick }) => {
  return <StyledTransparentButton onClick={onClick}>{children}</StyledTransparentButton>;
};

export default TransparentButton;
