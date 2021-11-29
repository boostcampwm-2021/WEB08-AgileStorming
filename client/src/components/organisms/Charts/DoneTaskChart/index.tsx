import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useCustomHistory from 'hooks/useCustomHistory';
import useToast from 'hooks/useToast';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { doneTaskChartState } from 'recoil/chart';
import { assigneeFilterState, sprintFilterState } from 'recoil/project';

const DoneTaskChart = () => {
  const { historyPush } = useCustomHistory();
  const { showMessage } = useToast();
  const setAssigneeFilter = useSetRecoilState(assigneeFilterState);
  const setSprintFilter = useSetRecoilState(sprintFilterState);
  const doneTaskData = useRecoilValue(doneTaskChartState);

  const { categories, series, dictSprintname, dictUsername } = doneTaskData;
  const copiedSeries = Object.values(series).map((elem) => ({ ...elem, data: [...elem.data] }));

  const options = {
    chart: {
      type: 'column',
    },

    title: {
      text: '태스크 완료도',
    },

    xAxis: {
      type: 'sprint',
      categories: categories,
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Tasks',
      },
      stackLabels: {
        enabled: true,
      },
    },

    tooltip: {
      formatter: function (this: Highcharts.TooltipFormatterContextObject): string {
        const sprintName = this.x;
        const seriesName = this.series.name;
        const taskNum = this.y;
        const isSprintTotal = seriesName === '주차 별 할당';
        const totalTask = isSprintTotal ? series.entire.total : series[seriesName].total;
        return isSprintTotal
          ? `
        <b>${sprintName}</b><br/><br/>
        전체 TASK 수: ${taskNum}
        `
          : `
        <b>* ${seriesName}</b><br/><br/>
        TASK 처리 수 : ${taskNum}<br/>
        평균 처리 수: ${(totalTask / categories.length).toFixed(2)}<br/>
        `;
      },
    },

    plotOptions: {
      column: {
        stacking: 'normal',
        point: {
          events: {
            click: function (this: { category: string; series: Highcharts.Series }) {
              const {
                category,
                series: { name },
              } = this;
              const sprintName = category?.split('<')[0];
              const sprintId = dictSprintname[sprintName];
              const assigneeId = dictUsername[name];
              setSprintFilter(sprintId);
              if (assigneeId) setAssigneeFilter(assigneeId);
              showMessage(`필터링: ${sprintName} ${assigneeId ? '유저명: ' + assigneeId : ''}`);
              historyPush('backlog');
            },
          },
        },
      },
      series: {
        cursor: 'pointer',
      },
    },

    series: copiedSeries,
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
    </>
  );
};

export default DoneTaskChart;
