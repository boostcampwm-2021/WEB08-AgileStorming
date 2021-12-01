import styled from '@emotion/styled';

const MonthSelectorWrapper = styled.div`
  ${({ theme }) => theme.flex.center};
  margin-top: 3rem;
  color: ${({ theme }) => theme.color.primary2};
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: bold;

  span {
    ${({ theme }) => theme.flex.center};
    width: 20rem;
  }
`;

export { MonthSelectorWrapper };
