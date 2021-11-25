import styled from '@emotion/styled';

interface IStyledIcon {
  color: string;
  cursor?: string;
  adaptive?: boolean;
}

export const StyledIcon = styled.span<IStyledIcon>`
  ${({ theme }) => theme.flex.center};
  ${({ adaptive }) =>
    adaptive
      ? ``
      : `width: 1.5rem;
  height: 1.5rem;`}

  padding: 0.1rem;
  border-radius: 1rem;
  background-color: ${({ color }) => `#${color}`};
  cursor: ${({ cursor }) => cursor ?? 'default'};
  font-weight: normal; // 구글 크롬 이모티콘 이슈
  user-select: none;
`;
