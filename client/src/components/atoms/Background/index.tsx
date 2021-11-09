import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  width?: string;
  height?: string;
  children?: React.ReactNode;
  id?: string;
  className?: string;
}

const WhiteBackground = styled.div<IProps>`
  position: relative;
  background-color: ${(props) => props.theme.color.bgWhite};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const Background: React.FC<IProps> = ({ className, width = '100vw', height = '100vh', children, id }) => {
  return (
    <WhiteBackground id={id} width={width} height={height} className={className}>
      {children}
    </WhiteBackground>
  );
};

export default Background;
