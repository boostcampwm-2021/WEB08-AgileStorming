import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  imgSrc: string;
}

const StyledIconButton = styled.button`
  border: none;
  background: transparent;
`;

const StyledImg = styled.img`
  padding: ${(props) => props.theme.padding.normal};
  :hover {
    cursor: pointer;
    border-radius: 99px;
    background: ${(props) => props.theme.color.gray3};
  }
`;

const IconButton: React.FC<IProps> = ({ onClick, imgSrc }) => {
  return (
    <StyledIconButton onClick={onClick}>
      <StyledImg src={imgSrc} alt='IconButton' />
    </StyledIconButton>
  );
};

export default IconButton;
