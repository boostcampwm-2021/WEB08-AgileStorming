import { common } from 'styles';
import styled from '@emotion/styled';

export type TStyle = 'small' | 'normal' | 'large';
export type TColor = 'white' | 'primary1' | 'primary2' | 'primary3';

interface IStyleProps {
  btnStyle: TStyle;
  color: TColor;
  margin?: string;
  bgColor?: string;
}

export const StyledButton = styled.button<IStyleProps>`
  all: unset;
  ${({ btnStyle }) => styleOptions[btnStyle]}
  ${({ color }) => colorOptions[color]}
  ${({ theme }) => theme.flex.center};
  ${({ theme }) => theme.shadow};
  margin: ${({ margin }) => margin};
  width: 100%;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  gap: 0.5rem;

  :hover,
  :focus {
    filter: brightness(1.1);
  }
`;

const styleOptions: { [key in TStyle]: string } = {
  small: `
    height: 1.5rem;
    max-width: 10rem;
    font-size: ${common.fontSize.small};
  `,
  normal: `
    height: 2rem;
    max-width: 15rem;
    font-size: ${common.fontSize.normal};
  `,
  large: `
    height: 3rem;
    max-width: 20rem;
    font-size: ${common.fontSize.large};
  `,
};

const colorOptions: { [key in TColor]: string } = {
  white: `
      color: ${common.color.black};
      background-color: ${common.color.bgWhite};
    `,
  primary1: `
      color: ${common.color.white};
      background-color: ${common.color.primary1};
    `,
  primary2: `
      color: ${common.color.white};
      background-color: ${common.color.primary2};
    `,
  primary3: `
      color: ${common.color.black};
      background-color: ${common.color.primary3};
    `,
};
