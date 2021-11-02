import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  width?: string;
  height?: string;
}

const WhiteBackground = styled.div<IProps>`
  background-color: ${(props) => props.theme.color.bgWhite};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const Background: React.FC<IProps> = ({ width = '100vw', height = '100vh' }) => {
  return <WhiteBackground width={width} height={height}></WhiteBackground>;
};

export default Background;
