import { atom } from 'recoil';

export const priorityListState = atom<string[]>({
  key: 'priorityList',
  default: ['낮음', '보통', '높음'],
});
