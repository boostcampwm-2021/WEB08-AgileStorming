import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  imgSrc: string;
  altText: string;
  size?: { width: string; height: string };
  noPadding?: boolean;
  noHover?: boolean;
}

interface IImgProps {
  noPadding?: boolean;
  noHover?: boolean;
}

const StyledIconImg = styled.img<IImgProps>`
  ${({ theme }) => theme.flex.columnCenter}
  padding: ${({ theme, noPadding }) => (noPadding ? null : theme.padding.small)};
  :hover {
    ${({ noHover, theme }) =>
      noHover
        ? null
        : `{ cursor: pointer;
    border-radius: 99px;
    background: ${theme.color.gray3};}
    `}
  }
`;

const IconImg: React.FC<IProps> = ({ imgSrc, altText, size, noPadding, noHover }) => {
  return <StyledIconImg src={imgSrc} alt={altText} width={size?.width} height={size?.height} noPadding={noPadding} noHover={noHover} />;
};

export default IconImg;
