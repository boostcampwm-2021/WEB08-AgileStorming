import React from 'react';
import { useRecoilValue } from 'recoil';
import ChartHeader from './ChartHeader';
import { StyledChartBackground, StyledChartContainer } from './style';
import { BurnDownChart, DoneTaskChart, PriorityChart, TaskRatioChart } from 'components/organisms';
import { selectedChartState } from 'recoil/chart';

const ChartContainer: React.FC = () => {
  const selectedChart = useRecoilValue(selectedChartState);
  const ChartComponent = (chartName: string) => {
    switch (chartName) {
      case 'task-ratio':
        return <TaskRatioChart />;
      case 'priority':
        return <PriorityChart />;
      case 'task-done':
        return <DoneTaskChart />;
      case 'burndown':
      default:
        return <BurnDownChart />;
    }
  };
  return (
    <StyledChartContainer>
      <ChartHeader />
      <StyledChartBackground>{ChartComponent(selectedChart)}</StyledChartBackground>
    </StyledChartContainer>
  );
};

export default ChartContainer;
