import drilldown from 'highcharts/modules/drilldown';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useRecoilValue } from 'recoil';
import { priorityChartState } from 'recoil/chart';
drilldown(Highcharts);

const PriorityChart = () => {
  const priorityData = useRecoilValue(priorityChartState);
  const { series, drilldownSeries } = priorityData;
  const copiedSeries = Object.values(series).map((elem) => ({ ...elem, data: elem.data.map((obj) => ({ ...obj })) }));
  const copiedDrilldown = Object.values(drilldownSeries).map((elem) => ({ ...elem, data: elem.data.map((obj) => [...obj]) }));
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: '우선순위 별 완료도',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: 'Tasks',
      },
      stackLabels: {
        enabled: true,
      },
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        borderWidth: 0,
      },
    },

    series: copiedSeries,
    drilldown: {
      series: copiedDrilldown,
    },
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default PriorityChart;
