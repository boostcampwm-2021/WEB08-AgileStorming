import React from 'react';
import { StyledTitle, TColor, TCursor, TStyle } from './style';

interface IProps {
  children?: React.ReactNode;
  titleStyle?: TStyle;
  color?: TColor;
  margin?: string;
  lineHeight?: number;
  cursor?: TCursor;
  width?: string;
}

const Title: React.FC<IProps> = ({
  children,
  margin = '0.5rem 0',
  color = 'black',
  titleStyle = 'normal',
  lineHeight,
  cursor = 'default',
  width,
}) => {
  return (
    <StyledTitle titleStyle={titleStyle} color={color} margin={margin} lineHeight={lineHeight} cursor={cursor} width={width}>
      {children}
    </StyledTitle>
  );
};

export default Title;
