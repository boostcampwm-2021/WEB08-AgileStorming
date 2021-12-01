from datetime import datetime, timedelta
import math
import random
import pandas as pd
import numpy as np
import uuid
from tqdm import tqdm

user_col = ['id', 'name', 'color', 'icon']
project_col = ['id', 'name', 'createdAt', 'creatorId', 'rootId']
project_users_user_col = ['projectId', 'userId']
mindmap_col = ['id', 'children', 'content', 'createdAt', 'projectId']
sprint_col = ['id', 'name', 'startDate', 'endDate', 'projectId', 'color']
label_col = ['name', 'color', 'projectId', 'id']
task_col = ['priority', 'estimatedTime', 'finishedTime', 'sprintId',
            'assigneeId', 'dueDate', 'status', 'labelIds', 'taskId', 'startDate', 'endDate']

user_rows = []
project_rows = []
project_users_user_rows = []
mindmap_rows = []
sprint_rows = []
label_rows = []
task_rows = []

colors = ['6ED5EB', '4CB8B8', '94D3CC', '4CA1DE', 'D092E2',
          '817DCE', '4A6CC3', 'B9D58C', 'E6D267', 'E2B765']
animals = ['panda', 'frog', 'dog', 'cat', 'rabbit']
priorities = ['높음', '보통', '낮음']
statuses = ['In Progress', 'To Do', 'Done']

rows = [user_rows, project_rows, project_users_user_rows,
        mindmap_rows, sprint_rows, label_rows, task_rows]
cols = [user_col, project_col, project_users_user_col,
        mindmap_col, sprint_col, label_col, task_col]
names = ['user', 'project', 'project_users_user',
         'mindmap', 'sprint', 'label', 'task']

user_number = 1000000
project_number = 10000
start_idx = 0
node_number = 30
small_number = 20

start_start_date = datetime.strptime('2021-11-01', '%Y-%m-%d')
start_end_date = datetime.strptime('2021-11-30', '%Y-%m-%d')

end_start_date = datetime.strptime('2021-12-01', '%Y-%m-%d')
end_end_date = datetime.strptime('2021-12-31', '%Y-%m-%d')


def to_csv_chunk(df, name):
    chunks = np.array_split(df.index, 100)
    for chunk, subset in enumerate(tqdm(chunks)):
        if chunk == 0:
            df.loc[subset].to_csv(
                f'./dummy-data/{name}.csv', mode='w', encoding='utf-8', index=False, sep=';')
        else:
            df.loc[subset].to_csv(
                f'./dummy-data/{name}.csv', header=None, mode='a', encoding='utf-8', index=False, sep=';')


def random_date(start, end):
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = random.randrange(int_delta)
    return (start + timedelta(seconds=random_second)).strftime('%Y-%m-%d')


def generate_data():
    print('user')
    for user in tqdm(range(user_number), position=0):
        user_rows.append([f'test_user_{user}', f'test_user_name-{math.floor(random.random()*user_number)}',
                         random.choice(colors), random.choice(animals)])
    print('project')
    for project in tqdm(range(project_number), position=0):
        projectId = uuid.uuid4()
        user_list = random.sample(user_rows, small_number)
        project_rows.append([projectId, f'test_project_{project}', '2021-11-30 10:24:54.684042',
                            f'{random.choice(user_list)[0]}', start_idx+node_number*project])
        for mindmap in range(node_number):
            if mindmap == 0:
                mindmap_rows.append([start_idx+node_number*project+mindmap,
                                    f'[{start_idx+node_number*project+1}]', f'test_mindmap_{project}-{mindmap}', '2021-11-30 10:24:54.684042', projectId])
            elif mindmap == 1:
                mindmap_rows.append([start_idx+node_number*project+mindmap,
                                    f'[{start_idx+node_number*project+2}]', f'test_mindmap_{project}-{mindmap}', '2021-11-30 10:24:54.684042', projectId])
            elif mindmap == 2:
                mindmap_rows.append([start_idx+node_number*project+mindmap,
                                    f'[{",".join([str(start_idx+node_number*project+i) for i in range(3,node_number)])}]', f'test_mindmap_{project}-{mindmap}', '2021-11-30 10:24:54.684042', projectId])
            else:
                mindmap_rows.append([start_idx+node_number*project+mindmap, '[]',
                                    f'test_mindmap_{project}-{mindmap}', '2021-11-30 10:24:54.684042', projectId])
        for user in user_list:
            project_users_user_rows.append([projectId, user[0]])

        sprint_list = []
        label_list = []
        for etc in range(small_number):
            etc_id = start_idx+small_number*project+etc
            sprint_list.append(etc_id)
            sprint_rows.append([etc_id, f'test_sprint_{project}-{etc}', random_date(
                start_start_date, start_end_date), random_date(end_start_date, end_end_date), projectId, random.choice(colors)])
            label_list.append(etc_id)
            label_rows.append([f'test_label_{project}-{etc}', random.choice(
                colors), projectId, etc_id])

        for task in range(3, node_number):
            status = random.choice(statuses)
            if status == 'To Do':
                task_rows.append([random.choice(priorities), random.randrange(1, small_number), None, random.choice(sprint_list),
                                  random.choice(user_list)[0], random_date(end_start_date, end_end_date), status, f'{random.choices(label_list,k=random.randrange(0,small_number))}', start_idx+node_number*project+task,  None, None])
            elif status == 'In Progress':
                task_rows.append([random.choice(priorities), random.randrange(1, small_number), None, random.choice(sprint_list),
                                  random.choice(user_list)[0], random_date(end_start_date, end_end_date), status, f'{random.choices(label_list,k=random.randrange(0,small_number))}', start_idx+node_number*project+task,  random_date(
                    start_start_date, start_end_date), None])
            else:
                task_rows.append([random.choice(priorities), random.randrange(1, small_number), random.randrange(1, small_number), random.choice(sprint_list),
                                  random.choice(user_list)[0], random_date(end_start_date, end_end_date), status, f'{random.choices(label_list,k=random.randrange(0,small_number))}', start_idx+node_number*project+task,  random_date(
                    start_start_date, start_end_date), random_date(end_start_date, end_end_date)])


if __name__ == '__main__':
    generate_data()
    for idx, row in enumerate(rows):
        print(names[idx]+'.csv')
        to_csv_chunk(pd.DataFrame(row, columns=cols[idx]), names[idx])
