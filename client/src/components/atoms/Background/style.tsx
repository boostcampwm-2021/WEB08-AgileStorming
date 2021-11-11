import styled from '@emotion/styled';

export type TColor = 'white' | 'bgWhite' | 'gray5';
export type TSize = 'full' | 'over';

interface IStyleProps {
  bgColor?: TColor;
  bgSize: TSize;
  position?: string;
  zIndex?: number;
}

export const BackgroundDiv = styled.div<IStyleProps>`
  ${({ bgSize }) => bgSizeOptions[bgSize]}
  position: ${({ position }) => position ?? 'absolute'};
  background-color: ${({ theme, bgColor }) => (bgColor ? theme.color[bgColor] : theme.color.bgWhite)};
  z-index: ${({ zIndex }) => zIndex ?? 0};
`;

const bgSizeOptions: { [key in TSize]: string } = {
  full: `
    width: 100%;
    height: 100%;
    `,
  over: `
    width: 5000px;
    height: 5000px;
    `,
};
