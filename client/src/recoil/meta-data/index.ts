import { atom } from 'recoil';

export const priorityListState = atom<string[]>({
  key: 'priorityList',
  default: ['낮음', '보통', '높음'],
});

export const statusListState = atom<string[]>({
  key: 'statusList',
  default: ['To do', 'In Progress', 'Done'],
});
