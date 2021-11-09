import { LabelHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { common } from 'styles';

export type TStyle = 'small' | 'normal' | 'large';

interface IStyleProps extends LabelHTMLAttributes<HTMLLabelElement> {
  labelStyle: TStyle;
  margin?: string;
  ratio?: number;
}

export const Wrapper = styled.div<IStyleProps>`
  display: grid;
  margin: ${({ margin }) => margin};
  ${({ ratio }) => {
    if (!ratio) {
      return '';
    }
    return `grid-template-columns: ${ratio * 100}% ${100 - ratio * 100}%`;
  }};
  ${({ labelStyle }) => styleOptions[labelStyle]}
`;

export const StyledLabel = styled.label<IStyleProps>`
  ${({ theme }) => theme.flex.rowCenter};
`;

const styleOptions: { [key in TStyle]: string } = {
  small: `
      font-size: ${common.fontSize.small};
    `,
  normal: `
      font-size: ${common.fontSize.normal};
      font-weight:bold
    `,
  large: `
      font-size: ${common.fontSize.large};
      font-weight:bold
    `,
};
