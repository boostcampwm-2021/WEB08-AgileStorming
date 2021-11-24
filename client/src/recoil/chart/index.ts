import { atom , selector } from 'recoil';

import { mindmapNodesState } from 'recoil/mindmap';
import { sprintListState, userListState } from 'recoil/project';

export const selectedChartState = atom<string>({
  key: 'selectedChart',
  default: 'burndown',
});

interface IDoneTaskChartData {
  name: string;
  color: string;
  data: Array<number>;
  stack: string;
  total: number;
  legendIndex: number;
}

interface IDoneTaskChartState {
  categories: Array<string>;
  series: { [index: string]: IDoneTaskChartData };
  dictSprintname: { [index: string]: number };
  dictUsername: { [index: string]: string };
}

type TDoneTaskSeriesObj = { [index: string]: IDoneTaskChartData };
const doneTaskChartState = selector<IDoneTaskChartState>({
  key: 'doneTaskChartState',
  get: ({ get }) => {
    const sprintList = get(sprintListState);
    const userList = get(userListState);
    const nodes = get(mindmapNodesState);

    const sprintLength = Object.values(sprintList).length;
    const sprintNames = Object.values(sprintList).map((sprint) => sprint.name);
    const series: TDoneTaskSeriesObj = {
      entire: {
        name: '주차 별 할당',
        color: '#bbbbbb',
        data: Array(sprintLength).fill(0),
        stack: 'Entire',
        total: 0,
        legendIndex: 0,
      },
    };
    const categories: Array<string> = [];
    const dictSprintname: { [index: string]: number } = {};
    Object.values(sprintList).forEach((sprint) => {
      categories.push(sprint.name + '<br/>' + sprint.startDate + ' ~ ' + sprint.endDate.split('-').pop());
      dictSprintname[sprint.name] = sprint.id;
    });

    const dictUsername: { [index: string]: string } = {};
    Object.values(userList).forEach(({ id, name, color }, i) => {
      series[id] = { name: name, color: '#' + color, data: Array(sprintLength).fill(0), stack: 'Done', total: 0, legendIndex: i + 1 };
      dictUsername[name] = id;
    });

    nodes.forEach(({ status, assigneeId, sprintId }) => {
      if (!sprintId) return;
      const sprintIdx = sprintNames.indexOf(sprintList[sprintId].name);
      series.entire.data[sprintIdx]++;
      series.entire.total++;
      if (assigneeId && status === 'Done') {
        series[assigneeId].data[sprintIdx]++;
        series[assigneeId].total++;
      }
    });

    return {
      categories: categories,
      series: series,
      dictSprintname: dictSprintname,
      dictUsername: dictUsername,
    };
  },
});

export { doneTaskChartState };
