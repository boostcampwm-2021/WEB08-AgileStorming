import { ButtonHTMLAttributes } from 'react';
import { common } from 'styles';
import styled from '@emotion/styled';

export type TStyle = 'small' | 'normal' | 'large' | 'full';
export type TColor = 'white' | 'primary1' | 'primary2' | 'primary3';

interface IStyleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  font-family: Noto Sans KR;
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
    padding: 0.4rem 0.8rem;
    font-size: ${common.fontSize.small};
  `,
  normal: `
    padding: 0.5rem 1.4rem;
    font-size: ${common.fontSize.normal};
  `,
  large: `
    padding: 0.5rem 2rem;
    font-size: ${common.fontSize.large};
  `,
  full: `
    width: 100%;
    padding: 0.9rem 0;
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
