import React from 'react';
import { IconImg, TransparentButton } from 'components/atoms';

interface IProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  imgSrc: string;
  altText: string;
}

const IconButton: React.FC<IProps> = ({ onClick, imgSrc, altText }) => {
  return (
    <TransparentButton onClick={onClick}>
      <IconImg imgSrc={imgSrc} altText={altText} />
    </TransparentButton>
  );
};

export default IconButton;
