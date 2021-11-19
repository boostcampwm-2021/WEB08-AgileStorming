import { whiteCloseBtn } from 'img';
import useLinkClick from 'hooks/useLinkClick';
import { Wrapper, UpperDiv } from './style';
import { Title } from 'components/atoms';
import { HistoryLog, IconButton, PlayController, HistoryWindow } from 'components/molecules';
import { useCallback, useEffect, useState } from 'react';
import { IHistoryData } from 'types/history';
import { useResetRecoilState, useRecoilState } from 'recoil';
import { historyDataListState } from 'recoil/history';
import { historyMapDataState } from 'recoil/mindmap';
import { restoreHistory } from 'utils/historyHandler';

const HistoryBar: React.FC = () => {
  const [historyDataList, setHistoryDataList] = useRecoilState(historyDataListState);
  const resetHistoryDataList = useResetRecoilState(historyDataListState);
  const resetHistoryMapData = useResetRecoilState(historyMapDataState);
  const [historyMapData, setHistoryMapData] = useRecoilState(historyMapDataState);
  const linkToMindmap = useLinkClick('mindmap');
  const [currentHistoryData, setCurrentHistoryData] = useState<IHistoryData | null>(null);

  const handleCloseHistoryBtnClick = () => {
    resetHistoryDataList();
    resetHistoryMapData();
    linkToMindmap();
  };

  const handleHistoryClick = useCallback(
    (historyDataPiece: IHistoryData) => () => {
      if (!currentHistoryData) return handleCloseHistoryBtnClick();
      if (currentHistoryData.historyId === historyDataPiece.historyId) return;

      const isForward = currentHistoryData.historyId < historyDataPiece.historyId;
      const targetData = isForward ? historyDataPiece : currentHistoryData;
      const params = { historyData: targetData, isForward, setHistoryMapData, setHistoryDataList, historyDataList, historyMapData };
      console.log(isForward, targetData, currentHistoryData);
      restoreHistory(params);
      setCurrentHistoryData(historyDataPiece);
    },
    [currentHistoryData, historyDataList, historyMapData]
  );

  useEffect(() => {
    if (!historyDataList.length || currentHistoryData) return;
    const lastData = historyDataList.at(-1);
    setCurrentHistoryData(lastData!);
  }, [historyDataList]);

  return (
    <Wrapper>
      <UpperDiv>
        <Title titleStyle='xxxlarge' color='white'>
          History
        </Title>
        <PlayController />
        <IconButton imgSrc={whiteCloseBtn} onClick={handleCloseHistoryBtnClick} altText='히스토리 닫기 버튼'></IconButton>
      </UpperDiv>
      <HistoryWindow onClick={handleHistoryClick} currentHistoryData={currentHistoryData} />
      <HistoryLog historyData={currentHistoryData} />
    </Wrapper>
  );
};

export default HistoryBar;
