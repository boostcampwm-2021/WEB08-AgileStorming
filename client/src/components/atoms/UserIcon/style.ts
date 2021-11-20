import styled from '@emotion/styled';

interface IStyledIcon {
  color: string;
  cursor?: string;
}

export const StyledIcon = styled.span<IStyledIcon>`
  ${({ theme }) => theme.flex.center};
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.1rem;
  border-radius: 1rem;
  background-color: ${({ color }) => `#${color}`};
  cursor: ${({ cursor }) => cursor ?? 'default'};
  user-select: none;
`;
