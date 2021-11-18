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
import { IMindmapData } from 'types/mindmap';
import { TAddNodeData, THistoryEventData } from 'types/event';
import { Levels } from 'utils/helpers';
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
  const { nodeFrom, nodeTo } = history.data;
  // historyHandler({ setMindmap: setHistoryMapData, historyData: history, isForward });

  switch (history.type) {
    case 'ADD_NODE':
      if (isForward)
        addNode({
          data: history.data!,
          mapData: historyMapData,
          parentId: nodeFrom!,
          newId: (history.data.dataTo! as TAddNodeData).nodeId!,
        });
      else
        reverseAddNode({
          data: history.data!,
          mapData: historyMapData,
          parentId: nodeFrom!,
          newId: (history.data.dataTo! as TAddNodeData).nodeId!,
          setHistoryData,
          history,
          historyData,
        });

      break;
    case 'DELETE_NODE':
      // const DeleteBackwardFactors = {
      //   data: history.data!,
      //   mindNodes: historyMapData!.mindNodes,
      //   parentId: nodeFrom!,
      //   newId: (history.data.dataFrom! as TDeleteNodeData).nodeId,
      // };

      if (isForward) {
      } else {
      }
      break;
    case 'MOVE_NODE':
      break;
    case 'UPDATE_NODE_CONTENT':
      break;
    case 'UPDATE_NODE_PARENT':
      break;
    case 'UPDATE_NODE_SIBLING':
      break;
    case 'UPDATE_TASK_INFORMATION':
      break;
  }

  const mapData = getNextMapState(historyMapData);

  setHistoryMapData(mapData);
};

interface IAddNodeParams {
  data: THistoryEventData;
  mapData: IMindmapData;
  parentId: number;
  newId: number;
  setHistoryData?: SetterOrUpdater<IHistoryData[]>;
  history?: IHistoryData;
  historyData?: IHistoryData[];
}

const addNode = ({ data, mapData, parentId, newId }: IAddNodeParams) => {
  const { level, content } = data.dataTo as TAddNodeData;
  const historyMap = mapData.mindNodes;
  const parent = historyMap.get(parentId);
  historyMap.set(parentId, { ...parent!, children: [...parent!.children, newId] });
  historyMap.set(newId, { nodeId: newId, level: level as Levels, content, children: [] });
};

const reverseAddNode = ({ data, mapData, parentId, newId, setHistoryData, history, historyData }: IAddNodeParams) => {
  const historyMap = mapData.mindNodes;
  const parent = historyMap.get(parentId);
  const childId = parent?.children[parent.children.length - 1];

  historyMap.set(parentId, { ...parent!, children: parent!.children.slice(0, -1) });

  if (!newId) {
    const pureHistory = JSON.parse(JSON.stringify(history));
    const newDataTo = { ...pureHistory.data.dataTo, nodeId: childId };
    const newHistory = { ...pureHistory!, data: { ...data, dataTo: newDataTo } };
    const newList = historyData!.map((d) => JSON.parse(JSON.stringify(d)));
    const index = newList.findIndex((d) => d.historyId === newHistory.historyId);
    newList.splice(index, 1, newHistory as IHistoryData);

    setHistoryData!(newList);
  }
};
