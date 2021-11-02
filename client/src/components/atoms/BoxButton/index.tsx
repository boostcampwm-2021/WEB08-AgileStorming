import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  children?: React.ReactNode;
  margin?: string;
  color?: string;
  bgColor?: string;
  onClick: React.MouseEventHandler;
}

interface IStyleProps {
  margin?: string;
  color?: string;
  bgColor?: string;
}

const Button = styled.button<IStyleProps>`
  all: unset;
  ${(props) => props.theme.flex.center};
  width: 100%;
  height: 47px;
  margin: ${(props) => props.margin ?? '0.5rem'};
  border-radius: 0.5rem;
  background-color: ${(props) => props.bgColor ?? props.theme.color.primary1};

  color: ${(props) => props.color ?? props.theme.color.black};
  font-size: ${(props) => props.theme.fontSize.large};
  font-weight: bold;
  cursor: pointer;
  ${(props) => props.theme.shadow};

  :hover,
  :focus {
    filter: brightness(1.1);
  }
`;
const BoxButton: React.FC<IProps> = ({ children, onClick, margin, color, bgColor }) => {
  return (
    <div>
      <Button onClick={onClick} margin={margin} color={color} bgColor={bgColor}>
        {children}
      </Button>
    </div>
  );
};

export default BoxButton;
