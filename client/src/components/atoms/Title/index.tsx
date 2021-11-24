import React from 'react';
import { StyledTitle, TColor, TCursor, TStyle } from './style';

interface IProps {
  children?: React.ReactNode;
  titleStyle?: TStyle;
  color?: TColor;
  margin?: string;
  lineHeight?: number;
  cursor?: TCursor;
}

const Title: React.FC<IProps> = ({
  children,
  margin = '0.5rem 0',
  color = 'black',
  titleStyle = 'normal',
  lineHeight,
  cursor = 'default',
}) => {
  return (
    <StyledTitle titleStyle={titleStyle} color={color} margin={margin} lineHeight={lineHeight} cursor={cursor}>
      {children}
    </StyledTitle>
  );
};

export default Title;
