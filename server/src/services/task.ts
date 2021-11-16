import { getRepository } from 'typeorm';
import { Label } from '../database/entities/Label';
import { Task } from '../database/entities/Task';
import { TUpdateTaskInformation } from '../utils/event-type';
import { findOneNode } from './mindmap';
import { findOneSprint } from './sprint';
import { findOneUser } from './user';

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

export const updateTask = async (nodeFrom: number, { changed }: TUpdateTaskInformation) => {
  const { assignee, labels, sprint, ...info } = changed;
  const task = await findOneOrCreate(nodeFrom);
  if (assignee) {
    const newAssignee = await findOneUser(assignee.toString(10));
    task.assignee = newAssignee;
  }
  if (labels) {
    const newLabels = await getRepository(Label).findByIds(labels);
    task.labels = newLabels;
  }
  if (sprint) {
    const newSprint = await findOneSprint(sprint.toString(10));
    task.sprint = newSprint;
  }
  if (info) {
    const newTask = { ...task, ...info };
    return getRepository(Task).save(newTask);
  }
  return getRepository(Task).save(task);
};
