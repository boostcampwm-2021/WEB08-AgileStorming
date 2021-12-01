import styled from '@emotion/styled';

const CalendarHeader = styled.div`
  ${({ theme }) => theme.flex.center};
  height: 2rem;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.primary1};
  border-right: 1px solid ${({ theme }) => theme.color.gray3};
`;

const CalendarDay = styled.div<{ disable?: boolean; today?: boolean }>`
  position: relative;
  height: 8.8rem;
  padding: 0.2rem;
  border-top: 1px solid ${({ theme }) => theme.color.gray3};
  border-right: 1px solid ${({ theme }) => theme.color.gray3};
  overflow: hidden;

  color: ${({ today, theme }) => (today ? theme.color.primary1 : theme.color.gray1)};
  background-color: ${({ disable, today, theme }) => {
    if (disable) {
      return theme.color.gray4;
    }
    if (today) {
      return theme.color.primary3;
    }
    return '';
  }};
`;

export { CalendarHeader, CalendarDay };
