import styled from '@emotion/styled';
import * as Types from 'styles/common';

interface IStyleProps {
  color: Types.TColor;
  weight?: string;
}

const SmallText = styled.p<IStyleProps>`
  color: ${(props) => props.theme.color[props.color]};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
`;
export default SmallText;
