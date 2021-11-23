import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useRecoilValue } from 'recoil';
import { sprintBurnDownState } from 'recoil/project';

interface IProps {
  child?: string;
}

const BurnDownChart: React.FC<IProps> = () => {
  const sprintInfoTask = useRecoilValue(sprintBurnDownState);
  const options = {
    title: {
      text: 'Burndown Chart',
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
        data: sprintInfoTask.map((info) => info.totalEstimatedTime),
      },
      {
        name: '실제 시간',
        color: 'rgba(0,120,200,0.75)',
        data: sprintInfoTask.map((info) => info.totalFinishedTime),
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />;
};

export default BurnDownChart;
