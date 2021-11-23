import { atom } from 'recoil';

export const selectedChartState = atom<string>({
  key: 'selectedChart',
  default: 'burndown',
});
