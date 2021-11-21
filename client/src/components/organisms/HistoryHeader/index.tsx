import { Wrapper } from './style';
import { IconButton, PlayController } from 'components/molecules';
import { historyMapDataState } from 'recoil/mindmap';
import { useResetRecoilState } from 'recoil';
import { currentReverseIdxState, historyDataListState } from 'recoil/history';
import useLinkClick from 'hooks/useLinkClick';
import { whiteCloseBtn } from 'img';
import { useCallback } from 'react';

const HistoryHeader = () => {
  const resetHistoryDataList = useResetRecoilState(historyDataListState);
  const resetHistoryMapData = useResetRecoilState(historyMapDataState);
  const resetCurrentReverseIdx = useResetRecoilState(currentReverseIdxState);

  const linkToMindmap = useLinkClick('mindmap');

  const handleCloseHistoryBtnClick = useCallback(() => {
    resetHistoryDataList();
    resetHistoryMapData();
    resetCurrentReverseIdx();
    linkToMindmap();
  }, [linkToMindmap]);

  return (
    <Wrapper>
      <input type='range' />
      <PlayController />
      <IconButton imgSrc={whiteCloseBtn} onClick={handleCloseHistoryBtnClick} altText='히스토리 닫기 버튼'></IconButton>
    </Wrapper>
  );
};
export default HistoryHeader;
