import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown';
import { useRecoilValue } from 'recoil';
import { userTaskRatioState } from 'recoil/project';
drilldown(Highcharts);
const TaskRatioChart: React.FC = () => {
  const userTaskInfo = useRecoilValue(userTaskRatioState);
  const totalEstimatedTime = userTaskInfo.reduce((pre, info) => pre + info.totalUserTaskEstimatedTime, 0);
  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '담당한 일 비율',
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: '%',
      },
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.1f}%',
        },
      },
    },

    tooltip: {
      enabled: false,
    },

    series: [
      {
        name: '담당자',
        colorByPoint: true,
        data: userTaskInfo.map((info) => {
          return {
            name: info.userName,
            y: 100 * (info.totalUserTaskEstimatedTime / totalEstimatedTime),
            taskTime: info.totalUserTaskEstimatedTime,
            drilldown: info.userName,
          };
        }),
      },
    ],
    drilldown: {
      series: userTaskInfo.map((info) => {
        return {
          name: info.userName,
          id: info.userName,
          taskTime: info.totalUserTaskEstimatedTime,
          data: info.tasks.map((task) => [task[0], 100 * (task[1] / totalEstimatedTime)]),
        };
      }),
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />;
};

export default TaskRatioChart;
