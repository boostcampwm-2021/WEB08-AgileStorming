import { atom , selector } from 'recoil';
import { mindmapNodesState } from 'recoil/mindmap';
import { sprintListState, userListState } from 'recoil/project';
import { IUser } from 'types/user';

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

interface IPriorityChartData {
  name: string;
  data: Array<IPriorityChartSeriesData>;
}

interface IPriorityChartSeriesData {
  name: string;
  y: number;
  drilldown: string;
}

type TDrilldownData = (string | number)[];
interface IPriorityChartDrilldownData {
  id: string;
  name: string;
  data: Array<TDrilldownData>;
}

interface IPriorityChartState {
  series: TPrioritySeriesObj;
  drilldownSeries: TPriorityDrilldownObj;
}
type TPrioritySeriesObj = { [index: string]: IPriorityChartData };
type TPriorityDrilldownObj = { [index: string]: IPriorityChartDrilldownData };
const getPriorityIndex = (priority: string) => {
  return priority === '높음' ? 0 : priority === '보통' ? 1 : 2;
};

const initSeries = (sprintName: string) => {
  return {
    name: sprintName,
    data: [initSeriesData(sprintName, '높음'), initSeriesData(sprintName, '보통'), initSeriesData(sprintName, '낮음')],
  };
};

const initSeriesData = (sprintName: string, priority: string) => {
  return {
    name: priority,
    y: 0,
    drilldown: sprintName + '-' + priority,
  };
};

const initDrilldownSeries = (drilldownSeries: TPriorityDrilldownObj, sprintName: string, userList: Record<string, IUser>) => {
  ['높음', '낮음', '보통'].forEach((priority) => {
    drilldownSeries[sprintName + priority] = initDrilldownData(sprintName, priority, userList);
  });
};

const initDrilldownData = (sprintName: string, priority: string, userList: Record<string, IUser>) => {
  return {
    id: sprintName + '-' + priority,
    name: sprintName + ', 우선순위: ' + priority,
    data: Object.values(userList).map(({ name }) => [name, 0]),
  } as IPriorityChartDrilldownData;
};

const priorityChartState = selector<IPriorityChartState>({
  key: 'priorityChartState',
  get: ({ get }) => {
    const sprintList = get(sprintListState);
    const userList = get(userListState);
    const nodes = get(mindmapNodesState);
    const series: TPrioritySeriesObj = { '남은 Task': initSeries('남은 Task') };
    const drilldownSeries: TPriorityDrilldownObj = {};
    initDrilldownSeries(drilldownSeries, '남은 Task', userList);

    nodes.forEach(({ sprintId, priority, status, assigneeId }) => {
      if (!sprintId) return;
      const sprintName = sprintList[sprintId].name;
      if (!series[sprintName]) {
        series[sprintName] = initSeries(sprintName);
        initDrilldownSeries(drilldownSeries, sprintName, userList);
      }
      if (!priority) return;
      const updateSeries = (name: string) => {
        series[name].data[getPriorityIndex(priority)].y++;
        if (assigneeId) {
          const data = drilldownSeries[name + priority]?.data.find((v) => v[0] === userList[assigneeId].name) as TDrilldownData;
          (data[1] as number)++;
        }
      };
      if (status === 'Done') updateSeries(sprintName);
      else updateSeries('남은 Task');
    });

    return {
      series: series,
      drilldownSeries: drilldownSeries,
    };
  },
});

export { doneTaskChartState, priorityChartState };
