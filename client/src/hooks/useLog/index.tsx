import { useRecoilValue } from 'recoil';
import { labelListState, sprintListState, userListState } from 'recoil/project';
import { TAddNodeData, TDeleteNodeData, TUpdateNodeContent, TUpdateTaskInformation, THistoryEventType } from 'types/event';
import { IHistoryData } from 'types/history';

type TConvertData = TAddNodeData | TUpdateNodeContent | TUpdateTaskInformation | TDeleteNodeData;

interface IConvertParams {
  dataTo?: TConvertData;
  dataFrom?: TConvertData;
}

type TConvertToDescription = {
  [key in THistoryEventType]: ({ dataFrom, dataTo }: IConvertParams) => string;
};

interface IConvertTaskInformationParams {
  dataTo?: TUpdateTaskInformation;
  dataFrom?: TUpdateTaskInformation;
}

export const useLog = () => {
  const userList = useRecoilValue(userListState);
  const labelList = useRecoilValue(labelListState);
  const sprintList = useRecoilValue(sprintListState);

  const getLog = ({ type, data: { dataTo, dataFrom } }: IHistoryData) => {
    return convertToDescription[type]({ dataTo, dataFrom } as IConvertParams);
  };

  const convertToDescription: TConvertToDescription = {
    ADD_NODE: ({ dataTo }) => `${(dataTo as TAddNodeData).content} 노드가 생성되었습니다.`,
    DELETE_NODE: ({ dataFrom }) => `${(dataFrom as TDeleteNodeData).content} 노드가 삭제되었습니다.`,
    UPDATE_NODE_PARENT: () => `노드 레벨이 변경되었습니다.`,
    UPDATE_NODE_CONTENT: ({ dataFrom, dataTo }) =>
      `노드 내용이 '${(dataFrom as TUpdateNodeContent).content}'에서 '${(dataTo as TUpdateNodeContent)!.content}'로 변경되었습니다.`,
    UPDATE_TASK_INFORMATION: (data) => {
      const { dataFrom, dataTo } = data as IConvertTaskInformationParams;
      const description = convertTaskInformation({ dataFrom, dataTo });
      return `노드의 상세정보가 변경되었습니다. ${description}`;
    },
  };

  const convertTaskInformation = ({ dataFrom, dataTo }: IConvertTaskInformationParams) => {
    const changedTask = Object.keys(dataFrom!.changed)[0];
    let [task, before, after]: [string, string, string] = ['', '', ''];

    switch (changedTask) {
      case 'assigneeId':
        task = ' 담당자 : ';
        before = `${dataFrom!.changed[changedTask] ? userList[dataFrom!.changed[changedTask]!].name : '지정하지 않음'}`;
        after = `${dataTo!.changed[changedTask] ? userList[dataTo!.changed[changedTask]!].name : '지정하지 않음'}`;
        break;
      case 'labels':
        task = ' 라벨 : ';
        before = `${dataFrom!.changed[changedTask]!.map((labelId) => labelList[labelId])}`;
        after = `${dataTo!.changed[changedTask]!.map((labelId) => labelList[labelId])}`;
        break;
      case 'priority':
        task = ' 중요도 : ';
        before = `${dataFrom!.changed[changedTask] ?? '지정하지 않음'}`;
        after = `${dataTo!.changed[changedTask] ?? '지정하지 않음'}`;
        break;
      case 'dueDate':
        task = ' 마감 날짜 : ';
        before = `${dataFrom!.changed[changedTask] ?? '지정하지 않음'}`;
        after = `${dataTo!.changed[changedTask] ?? '지정하지 않음'}`;
        break;
      case 'estimatedTime':
        task = ' 예상 소요 시간 : ';
        before = `${dataFrom!.changed[changedTask] ?? '지정하지 않음'}`;
        after = `${dataTo!.changed[changedTask] ?? '지정하지 않음'}`;
        break;
      case 'status':
        task = ' 진행 상태 : ';
        before = `${dataFrom!.changed[changedTask] ?? '지정하지 않음'}`;
        after = `${dataTo!.changed[changedTask] ?? '지정하지 않음'}`;
        break;
      case 'finishedTime':
        task = ' 마감 시간 : ';
        before = `${dataFrom!.changed[changedTask] ?? '지정하지 않음'}`;
        after = `${dataTo!.changed[changedTask] ?? '지정하지 않음'}`;
        break;
      case 'sprintId':
        task = ' 스프린트 : ';
        before = `${dataFrom!.changed[changedTask] ? sprintList[dataFrom!.changed[changedTask]!].name : '지정하지 않음'}`;
        after = `${dataTo!.changed[changedTask] ? sprintList[dataTo!.changed[changedTask]!].name : '지정하지 않음'}`;
        break;
    }

    return `${task}${before} -> ${after}`;
  };

  return getLog;
};
