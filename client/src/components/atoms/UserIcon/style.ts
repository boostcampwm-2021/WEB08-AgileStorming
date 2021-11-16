import styled from '@emotion/styled';

interface IStyledIcon {
  color: string;
  cursor?: string;
}

export const StyledIcon = styled.span<IStyledIcon>`
  background-color: ${({ color }) => `#${color}`};
  padding: 0.1rem;
  margin: 0.2rem;
  border-radius: 1rem;
  cursor: ${({ cursor }) => cursor ?? 'default'};
`;
