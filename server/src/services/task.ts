import { getRepository } from 'typeorm';
import { Label } from '../database/entities/Label';
import { Task } from '../database/entities/Task';
import { TUpdateTaskInformation } from '../utils/event-type';
import { findOneNode } from './mindmap';
import { findOneSprint } from './sprint';
import { findOneUser } from './user';

type TTask = {
  priority?: string;
  dueDate?: string;
  estimatedTime?: string;
  finishedTime?: string;
};

export const findOneTask = async (nodeId: string) => {
  return getRepository(Task).findOne({ relations: ['nodeId'], where: { nodeId } });
};

export const createTask = async (taskId: number) => {
  const node = await findOneNode(taskId);
  return getRepository(Task).save({ nodeId: node });
};

export const deleteTask = async (taskId: number) => {
  return getRepository(Task).createQueryBuilder('task').leftJoin('task.nodeId', 'nodeId').delete().where({ nodeId: taskId }).execute();
};

const findOneOrCreate = async (taskId: number) => {
  const task = await findOneTask(taskId.toString(10));
  if (task !== undefined) return task;
  await createTask(taskId);
  return findOneTask(taskId.toString(10));
};

const updateTaskInformation = async (task: Task, newData: TTask) => {
  const newTask = { ...task, ...newData };
  return getRepository(Task).save(newTask);
};

const updateTaskAssignee = async (task: Task, assigneeId: number) => {
  const assignee = await findOneUser(assigneeId.toString(10));
  task.assignee = assignee;
  return getRepository(Task).save(task);
};

const updateTaskSprint = async (task: Task, sprintId: number) => {
  const sprint = await findOneSprint(sprintId.toString(10));
  task.sprint = sprint;
  return getRepository(Task).save(task);
};

const updateTaskLabel = async (task: Task, labelIds: number[]) => {
  const labels = await getRepository(Label).findByIds(labelIds);
  task.labels = labels;
  return getRepository(Task).save(task);
};

export const updateTask = async (nodeFrom: number, { changed }: TUpdateTaskInformation) => {
  const { assignee, labels, sprint, ...info } = changed;
  const task = await findOneOrCreate(nodeFrom);
  if (assignee) {
    await updateTaskAssignee(task, assignee);
  }
  if (labels) {
    await updateTaskLabel(task, labels);
  }
  if (sprint) {
    await updateTaskSprint(task, sprint);
  }
  if (info) {
    await updateTaskInformation(task, info);
  }
};
