import { IMindNode } from '../src/types/mindmap';

const tasks: IMindNode[] = [
  {
    assigneeId: '22',
    children: [],
    content: '시작했는데 딜레이 되는 태스크',
    createdAt: '2021-11-02T12:03:40.979Z',
    dueDate: '2021-11-20',
    endDate: null,
    estimatedTime: '2',
    finishedTime: null,
    labelIds: '[]',
    level: 'TASK',
    nodeId: 8,
    priority: undefined,
    sprintId: undefined,
    startDate: '2021-11-30',
    status: 'In Progress',
  },
  {
    assigneeId: '22',
    children: [],
    content: '시작도 못한 태스크',
    createdAt: '2021-11-01T14:17:48.026Z',
    dueDate: '2021-11-20',
    endDate: null,
    estimatedTime: null,
    finishedTime: null,
    labelIds: '[8,13,10]',
    level: 'TASK',
    nodeId: 16,
    priority: undefined,
    sprintId: undefined,
    startDate: null,
    status: 'To Do',
  },
];

export default tasks;
