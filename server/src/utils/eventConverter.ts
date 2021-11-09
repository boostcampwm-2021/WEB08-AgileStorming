enum eventType {
  'ADD_NODE',
  'DELETE_NODE',
  'UPDATE_NODE',
}
enum eventArgs {
  'type' = 1,
  'project' = 3,
  'user' = 5,
  'data' = 7,
}

export const convertEvent = (args: string[]) => {
  const [type, project, user, data] = Object.keys(eventArgs).map((str) => args[str]);
  console.log(type, project, user, JSON.parse(data));
};
