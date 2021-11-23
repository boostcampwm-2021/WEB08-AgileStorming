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

  color: ${({ today, theme }) => (today ? theme.color.white : theme.color.gray1)};
  text-decoration: ${({ today }) => (today ? 'underline' : '')};
  background-color: ${({ disable, today, theme }) => {
    if (disable) {
      return theme.color.gray4;
    }
    if (today) {
      return theme.color.primary1;
    }
    return '';
  }};
`;

const DayTask = styled.div<{ delayed?: boolean | null }>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: ${({ theme, delayed }) => (delayed ? theme.color.red : theme.color.black)};

  :hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.primary1};
  }
`;

const LayerWrapper = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 60rem;
  top: 9.7rem;
  border-radius: 0.5rem;
  overflow: hidden;
  opacity: 1;
  pointer-events: none;
`;

const LayerDayWrapper = styled.div`
  position: relative;
  height: 6.8rem;
  width: 100%;
  padding-top: 2.8rem;
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.small};
  border-top: 1px solid ${({ theme }) => theme.color.gray3};

  overflow: hidden;

  div {
    ${({ theme }) => theme.flex.center};
    width: 100%;
    height: 1.2rem;
  }

  hr {
    margin: 0.5rem 0.1rem;
    border-top: dotted 2.5px;
  }

  .created {
    background-color: ${({ theme }) => theme.color.gray1};
  }
  .started {
    background-color: ${({ theme }) => theme.color.primary1};
  }
  .ended {
    background-color: ${({ theme }) => theme.color.primary2};
  }
  .due {
    background-color: ${({ theme }) => theme.color.red};
  }
  .waiting {
    color: ${({ theme }) => theme.color.gray1};
  }
  .working {
    color: ${({ theme }) => theme.color.primary1};
  }
  .resting {
    color: ${({ theme }) => theme.color.primary2};
  }
  .delaying {
    color: ${({ theme }) => theme.color.red};
  }
`;

export { MonthSelectorWrapper, CalendarWrapper, CalendarHeader, DayWrapper, DayTask, LayerWrapper, LayerDayWrapper };
