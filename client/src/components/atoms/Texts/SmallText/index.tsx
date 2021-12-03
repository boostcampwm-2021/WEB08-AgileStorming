import styled from '@emotion/styled';
import { TCursor } from '../Title/style';
import * as Types from 'styles/common';

interface IStyleProps {
  color: Types.TColor;
  weight?: string;
  margin?: string;
  cursor?: TCursor;
}

const SmallText = styled.p<IStyleProps>`
  color: ${({ theme, color }) => theme.color[color]};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ weight }) => weight ?? 'normal'};
  margin: ${({ margin }) => margin ?? '0'};
  cursor: ${({ cursor }) => cursor ?? 'default'};
`;

export default SmallText;
