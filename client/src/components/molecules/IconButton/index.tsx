import React from 'react';
import { IconImg, TransparentButton } from 'components/atoms';

interface IProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  imgSrc: string;
  altText: string;
  margin?: string;
  zIdx?: string;
  size?: { width: string; height: string };
}

const IconButton: React.FC<IProps> = ({ onClick, imgSrc, altText, margin, zIdx, size }) => {
  return (
    <TransparentButton onClick={onClick} margin={margin} zIdx={zIdx}>
      <IconImg imgSrc={imgSrc} altText={altText} size={size} />
    </TransparentButton>
  );
};

export default IconButton;
