import styled from '@emotion/styled';

const Wrapper = styled.div`
  ${({ theme }) => theme.flex.columnCenter};

  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;

  .blur {
    opacity: 0.5;
  }
  .no-click {
    pointer-events: none;
  }
`;

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
  border-left: 1px solid ${({ theme }) => theme.color.gray3};
  border-radius: 0.5rem;
  overflow: hidden;
  ${({ theme }) => theme.shadow};
`;

const CalendarHeader = styled.div`
  ${({ theme }) => theme.flex.center};
  height: 2rem;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.primary1};
  border-right: 1px solid ${({ theme }) => theme.color.gray3};
`;

const CalendarDay = styled.div<{ disable?: boolean; today?: boolean }>`
  position: relative;
  height: 6.8rem;
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

const LayerWrapper = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 60rem;
  top: 9.6rem;

  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;
  white-space: nowrap;

  border-radius: 0.5rem;
  overflow: hidden;
`;

const LayerDay = styled.div`
  position: relative;
  height: 6.8rem;
  border-top: 1px solid #00000000;

  overflow: hidden;
`;

const LayerScheduleDayWrapper = styled(LayerDay)`
  padding: 0.2rem;
  padding-top: 1.1rem;
`;

const LayerTask = styled.div<{ delayed?: boolean | null; ended?: boolean | null }>`
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;

  color: ${({ theme, delayed, ended }) => {
    if (delayed) {
      return theme.color.red;
    }
    if (ended) {
      return theme.color.primary1;
    }
    return theme.color.gray1;
  }};

  :hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.primary1};
  }
`;

const LayerTaskDetailDayWrapper = styled(LayerDay)`
  padding-top: 2.8rem;
  color: ${({ theme }) => theme.color.white};

  div {
    ${({ theme }) => theme.flex.center};
    width: 100%;
    height: 1.2rem;
    border-radius: 0.5rem;
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

const LayerSprintDayWrapper = styled(LayerDay)`
  opacity: 0.2;

  .start {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  .end {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;

const LayerSprint = styled.div<{ color: string }>`
  width: 100%;
  height: 1rem;
  background-color: ${({ color }) => `#${color}`}; ;
`;

export {
  Wrapper,
  MonthSelectorWrapper,
  CalendarWrapper,
  CalendarHeader,
  CalendarDay,
  LayerWrapper,
  LayerScheduleDayWrapper,
  LayerTask,
  LayerTaskDetailDayWrapper,
  LayerSprintDayWrapper,
  LayerSprint,
};
