import styled from '@emotion/styled';
import { IProps } from '.';

const StyledLabelIcon = styled.span<IProps>`
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ active, theme, label }) => (active ? `#${label.color}` : theme.color.gray2)};
  padding: 0 0.3rem;
  border-radius: 0.5rem;
  font-weight: bold;
`;

export { StyledLabelIcon };
