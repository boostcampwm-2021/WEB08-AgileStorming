import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { sprintBurnDownState, SprintTaskInfo } from 'recoil/project';

interface IProps {
  child?: string;
}

const BurnDownChart: React.FC<IProps> = () => {
  const sprintInfoTask = useRecoilValue(sprintBurnDownState);
  const totalTaskEstimatedTime = sprintInfoTask.reduce((prev: number, curr: SprintTaskInfo) => prev + curr.totalEstimatedTime, 0);
  const totalTaskFinishedTime = sprintInfoTask.reduce((prev: number, curr: SprintTaskInfo) => prev + curr.totalFinishedTime, 0);
  const options = {
    title: {
      text: '번다운 차트',
      x: -20,
    },
    colors: ['blue', 'red'],
    plotOptions: {
      line: {
        lineWidth: 3,
      },
    },
    xAxis: {
      categories: sprintInfoTask.map((info) => info.sprintName),
    },
    yAxis: {
      title: {
        text: 'Hours',
      },
      plotLines: [
        {
          value: 0,
          width: 1,
        },
      ],
    },
    tooltip: {
      valueSuffix: ' 시간',
      shared: true,
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0,
    },
    series: [
      {
        name: '예상 시간',
        color: 'rgba(255,0,0,0.25)',
        lineWidth: 2,
        data: sprintInfoTask
          .reduce(
            (prev: number[], curr: SprintTaskInfo, idx: number) => {
              return [...prev, prev[idx] - curr.totalEstimatedTime];
            },
            [totalTaskEstimatedTime]
          )
          .slice(0, -1),
      },
      {
        name: '실제 시간',
        color: 'rgba(0,120,200,0.75)',
        data: sprintInfoTask
          .reduce(
            (prev: number[], curr: SprintTaskInfo, idx: number) => {
              return [...prev, prev[idx] - curr.totalFinishedTime];
            },
            [totalTaskFinishedTime]
          )
          .slice(0, -1),
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />;
};

export default BurnDownChart;
