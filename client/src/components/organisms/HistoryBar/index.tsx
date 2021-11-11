import { whiteCloseBtn } from 'img';
import { Title } from 'components/atoms';
import { HistoryLog, IconButton, PlayController } from 'components/molecules';
import HistoryWindow from 'components/molecules/HistoryWindow';
import { Wrapper, UpperDiv } from './style';
import useLinkClick from 'hooks/useLinkClick';

const HistoryBar: React.FC = () => {
  const handleCloseHistoryBtnClick = useLinkClick('mindmap');

  const dummyData = { modifier: { id: 1, icon: whiteCloseBtn, color: 'blue', name: 'lapa' } };

  return (
    <Wrapper>
      <UpperDiv>
        <Title titleStyle='xxxlarge' color='white'>
          History
        </Title>
        <PlayController />
        <IconButton imgSrc={whiteCloseBtn} onClick={handleCloseHistoryBtnClick} altText='히스토리 닫기 버튼'></IconButton>
      </UpperDiv>
      <HistoryWindow />
      <HistoryLog modifier={dummyData.modifier} log='테스트용 로그' />
    </Wrapper>
  );
};

export default HistoryBar;
