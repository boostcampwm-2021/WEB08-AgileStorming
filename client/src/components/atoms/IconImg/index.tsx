import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  imgSrc: string;
  altText: string;
  size?: { width: string; height: string };
  borderRadius?: string;
  noHover?: boolean;
}

interface IImgProps {
  borderRadius?: string;
  noHover?: boolean;
}

const StyledIconImg = styled.img<IImgProps>`
  ${({ theme }) => theme.flex.columnCenter}
  padding: ${({ theme }) => theme.padding.small};
  border-radius: ${({ borderRadius }) => borderRadius ?? 0};
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

const IconImg: React.FC<IProps> = ({ imgSrc, altText, size, borderRadius, noHover }) => {
  return (
    <StyledIconImg src={imgSrc} alt={altText} width={size?.width} height={size?.height} borderRadius={borderRadius} noHover={noHover} />
  );
};

export default IconImg;
