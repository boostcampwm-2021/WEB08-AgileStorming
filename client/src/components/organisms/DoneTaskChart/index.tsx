import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { doneTaskChartState } from 'recoil/chart';

const DoneTaskChart = () => {
  const doneTaskData = useRecoilValue(doneTaskChartState);

  const { categories, series } = doneTaskData;
  const copiedSeries = Object.values(series).map((elem) => ({ ...elem, data: [...elem.data] }));

  const options = {
    chart: {
      type: 'column',
    },

    title: {
      text: '속도 차트',
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

    plotOptions: {
      column: {
        stacking: 'normal',
      },
      series: {
        cursor: 'pointer',
      },
    },

    series: copiedSeries,
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default DoneTaskChart;
