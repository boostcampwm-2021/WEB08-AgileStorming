import React from 'react';
import { StyledTitle, TColor, TStyle } from './style';

interface IProps {
  children?: React.ReactNode;
  titleStyle?: TStyle;
  color?: TColor;
  margin?: string;
  lineHeight?: number;
}

const Title: React.FC<IProps> = ({ children, margin = '0.5rem 0', color = 'black', titleStyle = 'normal', lineHeight }) => {
  return (
    <StyledTitle titleStyle={titleStyle} color={color} margin={margin} lineHeight={lineHeight}>
      {children}
    </StyledTitle>
  );
};

export default Title;
