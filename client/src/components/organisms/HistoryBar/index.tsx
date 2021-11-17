import { whiteCloseBtn } from 'img';
import useLinkClick from 'hooks/useLinkClick';
import { Wrapper, UpperDiv } from './style';
import { Title } from 'components/atoms';
import { HistoryLog, IconButton, PlayController, HistoryWindow } from 'components/molecules';
import { useState } from 'react';
import { IHistoryData } from 'types/history';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import { historyDataState } from 'recoil/history';
import { historyMapDataState } from 'recoil/mindmap';

const HistoryBar: React.FC = () => {
  const [historyData, setHistoryData] = useRecoilState(historyDataState);
  const setHistoryMapData = useSetRecoilState(historyMapDataState);
  const linkToMindmap = useLinkClick('mindmap');

  const lastData = historyData[historyData.length - 1];
  const [currentHistory, setCurrentHistory] = useState<IHistoryData>(lastData);

  const handleCloseHistoryBtnClick = () => {
    setHistoryData([]);
    setHistoryMapData(null);
    linkToMindmap();
  };
  const handleHistoryClick = (historyDataPiece: IHistoryData) => () => setCurrentHistory(historyDataPiece);

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
