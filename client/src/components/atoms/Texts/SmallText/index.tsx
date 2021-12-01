import styled from '@emotion/styled';
import * as Types from 'styles/common';

interface IStyleProps {
  color: Types.TColor;
  weight?: string;
  margin?: string;
}

const SmallText = styled.p<IStyleProps>`
  color: ${({ theme, color }) => theme.color[color]};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ weight }) => weight ?? 'normal'};
  margin: ${({ margin }) => margin ?? '0'};
  cursor: default;
`;

export default SmallText;
