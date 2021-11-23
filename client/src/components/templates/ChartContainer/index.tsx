import React from 'react';
import { BurnDownChart, TaskRatioChart } from 'components/organisms';
import { StyledChartBackground, StyledChartContainer } from './style';
import ChartHeader from './ChartHeader';
import { useRecoilValue } from 'recoil';
import { selectedChartState } from 'recoil/chart';

const ChartContainer: React.FC = () => {
  const selectedChart = useRecoilValue(selectedChartState);
  return (
    <StyledChartContainer>
      <ChartHeader />
      <StyledChartBackground>
        {selectedChart === 'burndown' ? <BurnDownChart /> : selectedChart === 'task-ratio' ? <TaskRatioChart /> : null}
      </StyledChartBackground>
    </StyledChartContainer>
  );
};

export default ChartContainer;
