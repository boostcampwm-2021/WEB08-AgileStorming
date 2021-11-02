import React from 'react';
import styled from '@emotion/styled';
import * as img from 'img';

interface IProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledShareButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const ShareButton: React.FC<IProps> = ({ onClick }) => {
  return (
    <StyledShareButton onClick={onClick}>
      <img src={img.share} alt='ShareButton' />
    </StyledShareButton>
  );
};

export default ShareButton;
