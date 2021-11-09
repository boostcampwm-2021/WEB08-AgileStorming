import styled from '@emotion/styled';
import { whiteCloseBtn } from 'img';
import { Title } from 'components/atoms';
import { HistoryLog, IconButton, PlayController } from 'components/molecules';
import HistoryWindow from 'components/molecules/HistoryWindow';
import { useHistory } from 'react-router';
import useProjectId from 'hooks/useRoomId';

const HistoryBar: React.FC = () => {
  const history = useHistory();
  const projectId = useProjectId();

  const handleCloseHistoryBtnClick = () => {
    history.push(`/mindmap/${projectId}`);
  };
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

const Wrapper = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  position: fixed;
  background-color: ${({ theme }) => theme.color.gray1};
  width: 100vw;
  height: 160px;
  bottom: 0;
  padding: 0 2rem;
`;

const UpperDiv = styled.div`
  ${({ theme }) => theme.flex.row};
  justify-content: space-between;
  padding: 0 2rem;
  width: 100%;
  height: 45px;
`;

const topBar = styled.div``;
