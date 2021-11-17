import styled from '@emotion/styled';

interface IStyledIcon {
  color: string;
}

export const StyledIcon = styled.span<IStyledIcon>`
  font-size: 0.5rem;
  color: ${({ color }) => `#${color}`};
  background-color: ${({ color }) => `#${color}`};
  padding: 0 0.1rem;
  margin: 0.2rem;
  border-radius: 1rem;
`;
