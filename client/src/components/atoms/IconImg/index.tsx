import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  imgSrc: string;
  altText: string;
}

const StyledIconImg = styled.img`
  padding: ${(props) => props.theme.padding.normal};
  :hover {
    cursor: pointer;
    border-radius: 99px;
    background: ${(props) => props.theme.color.gray3};
  }
`;

const IconImg: React.FC<IProps> = ({ imgSrc, altText }) => {
  return <StyledIconImg src={imgSrc} alt={altText} />;
};

export default IconImg;
