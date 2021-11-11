import React from 'react';
import { BackgroundDiv, TSize, TColor } from './style';

interface IProps {
  bgSize: TSize;
  bgColor?: TColor;
  zIndex?: number;
  children?: React.ReactNode;
  id?: string;
  className?: string;
}

const Background: React.FC<IProps> = ({ className, bgColor, bgSize, children, id, zIndex }) => {
  return (
    <BackgroundDiv id={id} className={className} bgColor={bgColor} bgSize={bgSize} zIndex={zIndex}>
      {children}
    </BackgroundDiv>
  );
};

export default Background;
