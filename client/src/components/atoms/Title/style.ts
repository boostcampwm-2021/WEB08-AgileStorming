import styled from '@emotion/styled';
import common from 'styles/common';

interface IStyleProps {
  titleStyle: TStyle;
  color: TColor;
  margin?: string;
  lineHeight?: number;
  cursor?: TCursor;
  width?: string;
}

export type TStyle = 'small' | 'normal' | 'large' | 'xlarge' | 'xxxlarge' | 'title';
export type TColor = 'black' | 'white';
export type TCursor = 'default' | 'pointer' | 'text' | 'none';

export const StyledTitle = styled.div<IStyleProps>`
  ${({ titleStyle }) => styleOptions[titleStyle]}
  ${({ color }) => colorOptions[color]}
  margin: ${({ margin }) => margin};
  font-weight: bold;
  line-height: ${({ lineHeight }) => lineHeight ?? 1.2};
  cursor: ${({ cursor }) => cursor};
  width: ${({ width }) => width};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const styleOptions: { [key in TStyle]: string } = {
  small: `
    font-size: ${common.fontSize.small};
  `,
  normal: `
    font-size: ${common.fontSize.normal};
  `,
  large: `
    font-size: ${common.fontSize.large};
  `,
  xlarge: `
    font-size: ${common.fontSize.xlarge};
  `,
  xxxlarge: `
    font-size: ${common.fontSize.xxxlarge};
  `,
  title: `
    font-size: ${common.fontSize.title};
  `,
};

const colorOptions: { [key in TColor]: string } = {
  black: `
        color: ${common.color.black};
        `,
  white: `
      color: ${common.color.white};
    `,
};

export default StyledTitle;
