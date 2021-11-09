import { InputHTMLAttributes } from 'react';
import { common } from 'styles';
import styled from '@emotion/styled';

export type TStyle = 'small' | 'normal' | 'large' | 'full';

interface IStyleProps extends InputHTMLAttributes<HTMLInputElement> {
  inputStyle: TStyle;
  margin?: string;
}

export const StyledInput = styled.input<IStyleProps>`
  all: unset;
  ${({ inputStyle }) => styleOptions[inputStyle]}
  ${({ theme }) => theme.shadow};
  margin: ${({ margin }) => margin};

  box-sizing: border-box;
  border: 1.5px solid ${({ theme }) => theme.color.bgWhite};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.bgWhite};
  font-weight: bold;
  cursor: text;

  :focus {
    border: 1.5px solid ${({ theme }) => theme.color.primary2};
  }
`;

const styleOptions: { [key in TStyle]: string } = {
  small: `
    padding: 0.4rem 0.5rem;
    font-size: ${common.fontSize.small};
  `,
  normal: `
    padding: 0.5rem 0.5rem;
    font-size: ${common.fontSize.normal};
  `,
  large: `
    padding: 0.6rem 0.5rem;
    font-size: ${common.fontSize.large};
  `,
  full: `
    width: 100%;
    padding: 0.6rem 0.5rem;
    font-size: ${common.fontSize.large};
  `,
};
