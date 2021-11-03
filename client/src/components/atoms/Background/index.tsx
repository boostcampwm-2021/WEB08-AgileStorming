import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  width?: string;
  height?: string;
  children?: React.ReactNode;
}

const WhiteBackground = styled.div<IProps>`
  position: relative;
  background-color: ${(props) => props.theme.color.bgWhite};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const Background = ({ width = '100vw', height = '100vh', children }: IProps) => {
  return (
    <WhiteBackground width={width} height={height}>
      {children}
    </WhiteBackground>
  );
};

export default Background;
