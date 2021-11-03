import React from 'react';
import { IconImg, TransparentButton } from 'components/atoms';

interface IProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  imgSrc: string;
}

const IconButton: React.FC<IProps> = ({ onClick, imgSrc }) => {
  return (
    <TransparentButton onClick={onClick}>
      <IconImg imgSrc={imgSrc} />
    </TransparentButton>
  );
};

export default IconButton;
