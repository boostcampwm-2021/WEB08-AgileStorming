import { whiteCloseBtn } from 'img';
import useLinkClick from 'hooks/useLinkClick';
import { Wrapper, UpperDiv } from './style';
import { Title } from 'components/atoms';
import { HistoryLog, IconButton, PlayController, HistoryWindow } from 'components/molecules';
import { useEffect, useState } from 'react';
import { IHistoryData } from 'types/history';
import { useResetRecoilState, useRecoilState } from 'recoil';
import { historyDataState } from 'recoil/history';
import { historyMapDataState } from 'recoil/mindmap';
import { restoreHistory } from 'utils/historyHandler';

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
    if (currentHistory.historyId === historyDataPiece.historyId) return;

    const isForward = currentHistory ? currentHistory.historyId < historyDataPiece.historyId : false;
    const targetData = isForward ? historyDataPiece : currentHistory ?? lastData;
    const params = { history: targetData, isForward, setHistoryMapData, setHistoryData, historyData, historyMapData };
    restoreHistory(params);

    setCurrentHistory(historyDataPiece);
  };

  useEffect(() => {
    setCurrentHistory(lastData);
  }, [lastData]);

  return (
    <Wrapper>
      <UpperDiv>
        <Title titleStyle='xxxlarge' color='white'>
          History
        </Title>
        <PlayController />
        <IconButton imgSrc={whiteCloseBtn} onClick={handleCloseHistoryBtnClick} altText='히스토리 닫기 버튼'></IconButton>
      </UpperDiv>
      <HistoryWindow onClick={handleHistoryClick} currentHistory={currentHistory} />
      <HistoryLog history={currentHistory} />
    </Wrapper>
  );
};

export default HistoryBar;
