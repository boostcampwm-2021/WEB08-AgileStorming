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

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 60rem;
  margin: 1.5rem 0 1rem 0;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 0.5rem;
  overflow: hidden;
  ${({ theme }) => theme.shadow};
`;

const CalendarHeader = styled.div`
  ${({ theme }) => theme.flex.center};
  height: 2rem;
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;
  background-color: ${({ theme }) => theme.color.primary1};
  border-right: 1px solid ${({ theme }) => theme.color.gray3};
`;

const DayWrapper = styled.div<{ disable?: boolean; today?: boolean }>`
  position: relative;
  padding: 0.2rem;
  height: 6.8rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  border-top: 1px solid ${({ theme }) => theme.color.gray3};
  border-right: 1px solid ${({ theme }) => theme.color.gray3};
  overflow: hidden;

  color: ${({ today, theme }) => (today ? theme.color.primary1 : theme.color.gray1)};
  text-decoration: ${({ today }) => (today ? 'underline' : '')};
  background-color: ${({ disable, theme }) => (disable ? theme.color.gray4 : '')};
`;

const DayTask = styled.div<{ disable?: boolean; today?: boolean }>`
  color: ${({ theme }) => theme.color.black};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  :hover {
    background-color: ${({ theme }) => theme.color.gray4};
  }
`;

export { MonthSelectorWrapper, CalendarWrapper, CalendarHeader, DayWrapper, DayTask };
