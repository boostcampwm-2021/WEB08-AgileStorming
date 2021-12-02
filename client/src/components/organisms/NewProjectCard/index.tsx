import React from 'react';
import { StyledNewProjectCard } from './style';
import * as img from 'img';

interface IProps {
  onClickPlusButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const NewProjectCard: React.FC<IProps> = ({ onClickPlusButton }) => {
  return (
    <>
      <StyledNewProjectCard onClick={onClickPlusButton}>
        <img src={img.plus} alt='plus' />
      </StyledNewProjectCard>
    </>
  );
};

export default NewProjectCard;
