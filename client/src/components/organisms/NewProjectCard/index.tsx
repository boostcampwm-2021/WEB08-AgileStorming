import React from 'react';
import styled from '@emotion/styled';
import * as img from 'img';

interface IProps {
  onClickPlusButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledNewProjectCard = styled.button`
  ${(props) => props.theme.flex.center}
  width: 320px;
  height: 300px;
  background: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray3};
  border-radius: 5px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  margin: 10px;
  :hover {
    cursor: pointer;
    background: ${(props) => props.theme.color.bgWhite};
  }
`;

const NewProjectCard: React.FC<IProps> = ({ onClickPlusButton }) => {
  return (
    <StyledNewProjectCard onClick={onClickPlusButton}>
      <img src={img.plus} />
    </StyledNewProjectCard>
  );
};

export default NewProjectCard;
