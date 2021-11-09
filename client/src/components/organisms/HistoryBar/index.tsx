import styled from '@emotion/styled';
import { whiteCloseBtn } from 'img';
import { Title } from 'components/atoms';
import { IconButton, PlayController } from 'components/molecules';

const HistoryBar: React.FC = () => {
  const handleCloseHistoryBtnClick = () => {};

  return (
    <Wrapper>
      <UpperDiv>
        <Title titleStyle='xxxlarge' color='white'>
          History
        </Title>
        <PlayController />
        <IconButton imgSrc={whiteCloseBtn} onClick={handleCloseHistoryBtnClick} altText='히스토리 닫기 버튼'></IconButton>
      </UpperDiv>
      <div></div>
      <div></div>
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
`;

const UpperDiv = styled.div`
  ${({ theme }) => theme.flex.row};
  justify-content: space-between;
  padding: 0 2rem;
  width: 100%;
`;

const topBar = styled.div``;
