import styled from '@emotion/styled';

export type TColor = 'white' | 'bgWhite' | 'gray5';
export type TSize = 'full' | 'over';

interface IStyleProps {
  bgColor?: TColor;
  bgSize?: TSize;
  position?: string;
}

export const BackgroundDiv = styled.div<IStyleProps>`
  position: ${({ position }) => position ?? 'relative'};
  background-color: ${({ theme, bgColor }) => (bgColor ? theme.color[bgColor] : theme.color.bgWhite)};
`;

const bgSizeOptions: { [key in TSize]: string } = {
  full: `
    width: 100%
    heigth: 100%
    `,
  over: `
    width: 5000px
    hegit: 5000px
    `,
};
