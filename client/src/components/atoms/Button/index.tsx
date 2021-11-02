import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  children?: React.ReactNode;
  text?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PrimaryButton = styled.button`
  background-color: ${(props) => props.theme.color.bgWhite};
  color: ${(props) => props.theme.color.black};
`;

const Button: React.FC<IProps> = ({ children, text, onClick }) => {
  return (
    <PrimaryButton onClick={onClick}>
      {text}
      {children}
    </PrimaryButton>
  );
};

export default Button;
