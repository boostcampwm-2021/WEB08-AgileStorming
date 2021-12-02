import { RightWrapper, Wrapper, Range } from './style';
import { IconButton, PlayController } from 'components/molecules';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { currentReverseIdxState, historyDataListState, historyMapDataState, historyMovingSpeedState } from 'recoil/history';
import { whiteCloseBtn } from 'img';
import useCumstomHistory from 'hooks/useCustomHistory';

const HistoryHeader = () => {
  const setHistoryMovingSpeed = useSetRecoilState(historyMovingSpeedState);
  const resetHistoryDataList = useResetRecoilState(historyDataListState);
  const resetHistoryMapData = useResetRecoilState(historyMapDataState);
  const resetCurrentReverseIdx = useResetRecoilState(currentReverseIdxState);
  const resetMovingSpeed = useResetRecoilState(historyMovingSpeedState);
  const { historyPush } = useCumstomHistory();

  const handleCloseHistoryBtnClick = () => {
    resetHistoryDataList();
    resetHistoryMapData();
    resetCurrentReverseIdx();
    resetMovingSpeed();
    historyPush('mindmap');
  };

  const changeHistoryMovingSpeed = ({ currentTarget }: React.MouseEvent<HTMLInputElement>) => {
    const changedSpeed = 1000 - Number(currentTarget.value) * 10;
    setHistoryMovingSpeed(changedSpeed);
  };

  return (
    <Wrapper>
      <Range type='range' onMouseUp={changeHistoryMovingSpeed} max='70' defaultValue='35' />
      <PlayController />
      <RightWrapper>
        <IconButton imgSrc={whiteCloseBtn} onClick={handleCloseHistoryBtnClick} altText='히스토리 닫기 버튼' />
      </RightWrapper>
    </Wrapper>
  );
};
export default HistoryHeader;
