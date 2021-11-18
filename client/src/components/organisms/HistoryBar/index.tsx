import { whiteCloseBtn } from 'img';
import useLinkClick from 'hooks/useLinkClick';
import { Wrapper, UpperDiv } from './style';
import { Title } from 'components/atoms';
import { HistoryLog, IconButton, PlayController, HistoryWindow } from 'components/molecules';
import { useState } from 'react';
import { IHistoryData } from 'types/history';
import { SetterOrUpdater, useResetRecoilState, useRecoilState } from 'recoil';
import { historyDataState } from 'recoil/history';
import { getNextMapState, historyMapDataState } from 'recoil/mindmap';
import { IMindmapData, IMindNodes } from 'types/mindmap';
import { Levels } from 'utils/helpers';
import {
  TAddNodeData,
  TDeleteNodeData,
  TMoveNodeData,
  TUpdateNodeContent,
  TUpdateNodeParent,
  TUpdateNodeSibling,
  TUpdateTaskInformation,
} from 'types/event';
// import { historyHandler } from 'hooks/useHistoryReceiver';

const HistoryBar: React.FC = () => {
  const [historyData, setHistoryData] = useRecoilState(historyDataState);
  const resetHistoryData = useResetRecoilState(historyDataState);
  const resetHistoryMapData = useResetRecoilState(historyMapDataState);
  const [historyMapData, setHistoryMapData] = useRecoilState(historyMapDataState);
  const linkToMindmap = useLinkClick('mindmap');
  const lastData = historyData[historyData.length - 1];

  const [currentHistory, setCurrentHistory] = useState<IHistoryData>(lastData);
  const handleCloseHistoryBtnClick = () => {
    resetHistoryData();
    resetHistoryMapData();
    linkToMindmap();
  };
  const handleHistoryClick = (historyDataPiece: IHistoryData) => () => {
    const isForward = currentHistory ? currentHistory.historyId < historyDataPiece.historyId : false;
    const targetData = isForward ? historyDataPiece : currentHistory ?? lastData;
    const params = { history: targetData, isForward, setHistoryMapData, setHistoryData, historyData, historyMapData };
    restoreHistory(params);

    setCurrentHistory(historyDataPiece);
  };

  return (
    <Wrapper>
      <UpperDiv>
        <Title titleStyle='xxxlarge' color='white'>
          History
        </Title>
        <PlayController />
        <IconButton imgSrc={whiteCloseBtn} onClick={handleCloseHistoryBtnClick} altText='히스토리 닫기 버튼'></IconButton>
      </UpperDiv>
      <HistoryWindow onClick={handleHistoryClick} />
      <HistoryLog history={currentHistory} />
    </Wrapper>
  );
};

export default HistoryBar;

interface IParams {
  history: IHistoryData;
  isForward: boolean;
  setHistoryMapData: SetterOrUpdater<IMindmapData>;
  setHistoryData: SetterOrUpdater<IHistoryData[]>;
  historyData: IHistoryData[];
  historyMapData: IMindmapData;
}

const restoreHistory = (params: IParams) => {
  const { history, isForward, setHistoryMapData, setHistoryData, historyData, historyMapData } = params;
  const historyMap = historyMapData.mindNodes;
  // historyHandler({ setMindmap: setHistoryMapData, historyData: history, isForward });

  switch (history.type) {
    case 'ADD_NODE':
      if (isForward)
        addNode({
          history,
          historyMap,
        });
      else
        deleteNode({
          history,
          historyMap,
          setHistoryData,
          historyData,
        });

      break;
    case 'DELETE_NODE':
      if (isForward) deleteNode({ history, historyMap });
      else {
      }
      break;
    case 'MOVE_NODE':
      if (isForward) moveNode({ data: history.data.dataTo as TMoveNodeData, id: history.data.nodeFrom!, historyMap });
      else moveNode({ data: history.data.dataFrom as TMoveNodeData, id: history.data.nodeFrom!, historyMap });
      break;
    case 'UPDATE_NODE_CONTENT':
      if (isForward)
        updateNodeContent({
          id: history.data.nodeFrom!,
          content: (history.data.dataTo! as TUpdateNodeContent).content,
          historyMap,
        });
      else
        updateNodeContent({
          id: history.data.nodeTo!,
          content: (history.data.dataFrom! as TUpdateNodeContent).content,
          historyMap,
        });
      break;
    case 'UPDATE_NODE_PARENT':
      if (isForward)
        updateNodeParent({
          from: history.data.nodeFrom!,
          to: history.data.nodeTo!,
          data: history.data.dataTo as TUpdateNodeParent,
          historyMap,
        });
      else
        updateNodeParent({
          from: history.data.nodeTo!,
          to: history.data.nodeFrom!,
          data: history.data.dataFrom as TUpdateNodeParent,
          historyMap,
        });
      break;
    case 'UPDATE_NODE_SIBLING':
      if (isForward) updateNodeSibling({ data: history.data.dataTo as TUpdateNodeSibling, historyMap });
      else updateNodeSibling({ data: history.data.dataFrom as TUpdateNodeSibling, historyMap });
      break;
    case 'UPDATE_TASK_INFORMATION':
      if (isForward) updateNodeInformation({ id: history.data.nodeFrom!, data: history.data.dataTo as TUpdateTaskInformation, historyMap });
      else updateNodeInformation({ id: history.data.nodeFrom!, data: history.data.dataFrom as TUpdateTaskInformation, historyMap });
      break;
  }

  const mapData = getNextMapState(historyMapData);

  setHistoryMapData(mapData);
};

interface IAddNodeParams {
  history: IHistoryData;
  historyMap: IMindNodes;
}

const addNode = ({ history, historyMap }: IAddNodeParams) => {
  const parentId = history.data.nodeFrom!;
  const parent = historyMap.get(parentId)!;
  const nodeId = history.data.dataTo ? (history.data.dataTo as TAddNodeData).nodeId! : (history.data.dataFrom as TDeleteNodeData).nodeId!;

  const { level, content } = history.data.dataTo as TAddNodeData;
  const newNode = history.data.dataTo
    ? { level: level as Levels, content, children: [], nodeId }
    : { ...(history.data.dataFrom as TDeleteNodeData) };

  historyMap.set(parentId, { ...parent!, children: [...parent!.children, nodeId] });
  historyMap.set(nodeId, newNode);
};

interface IUpdateNodeContentParams {
  id: number;
  content: string;
  historyMap: IMindNodes;
}

const updateNodeContent = ({ id, content, historyMap }: IUpdateNodeContentParams) => {
  const node = historyMap.get(id);
  node!.content = content;

  historyMap.set(id, node!);
};

interface IMoveNodeParams {
  data: TMoveNodeData;
  id: number;
  historyMap: IMindNodes;
}

const moveNode = ({ data, id, historyMap }: IMoveNodeParams) => {
  const node = historyMap.get(id);
  node!.posX = data.posX;
  node!.posY = data.posY;

  historyMap.set(id, node!);
};

interface IDeleteNodeParams {
  history: IHistoryData;
  historyMap: IMindNodes;
  setHistoryData?: SetterOrUpdater<IHistoryData[]>;
  historyData?: IHistoryData[];
}

const deleteNode = ({ history, historyMap, historyData, setHistoryData }: IDeleteNodeParams) => {
  const parentId = history.data.nodeFrom!;
  const parent = historyMap.get(parentId)!;

  const childId = history.data.dataFrom ? (history.data.dataFrom as TDeleteNodeData).nodeId : parent.children[parent.children.length - 1];
  const newChildren = history.data.dataFrom ? parent.children.filter((cid) => cid !== childId) : parent.children.slice(0, -1);

  historyMap.set(parentId, { ...parent, children: newChildren });

  if (!(history.data.dataTo! as TAddNodeData).nodeId) {
    const newDataTo = { ...history.data.dataTo, nodeId: childId };
    const newHistory = { ...history!, data: { ...history.data, dataTo: newDataTo } };
    const newList = [...historyData!];
    const index = newList.findIndex((d) => d.historyId === newHistory.historyId);
    newList.splice(index, 1, newHistory as IHistoryData);

    setHistoryData!(newList);
  }
};

interface IUpdateNodeParentParams {
  from: number;
  to: number;
  data: TUpdateNodeParent;
  historyMap: IMindNodes;
}

const updateNodeParent = ({ from, to, data, historyMap }: IUpdateNodeParentParams) => {
  const fromNode = historyMap.get(from)!;
  const toNode = historyMap.get(to)!;

  fromNode.children = fromNode.children.filter((childId) => childId !== data.nodeId);
  toNode.children = [...toNode.children, data.nodeId];

  historyMap.set(from, fromNode);
  historyMap.set(to, toNode);
};

interface IUpdateNodeSiblingParams {
  data: TUpdateNodeSibling;
  historyMap: IMindNodes;
}

const updateNodeSibling = ({ data, historyMap }: IUpdateNodeSiblingParams) => {
  const { parentId, children } = data;
  const parent = historyMap.get(parentId)!;

  parent.children = children;
  historyMap.set(parentId, parent);
};

interface IUpdateNodeInformationParams {
  id: number;
  data: TUpdateTaskInformation;
  historyMap: IMindNodes;
}

const updateNodeInformation = ({ id, data, historyMap }: IUpdateNodeInformationParams) => {
  const node = historyMap.get(id)!;
  node.assignee = data.changed.assignee;

  historyMap.set(id, node);
};
