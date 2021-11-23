import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  imgSrc: string;
  altText: string;
  size?: { width: string; height: string };
}

const StyledIconImg = styled.img`
  ${({ theme }) => theme.flex.columnCenter}
  padding: ${({ theme }) => theme.padding.small};
  :hover {
    cursor: pointer;
    border-radius: 99px;
    background: ${({ theme }) => theme.color.gray3};
  }
`;

const IconImg: React.FC<IProps> = ({ imgSrc, altText, size }) => {
  return <StyledIconImg src={imgSrc} alt={altText} width={size?.width} height={size?.height} />;
};

export default IconImg;
