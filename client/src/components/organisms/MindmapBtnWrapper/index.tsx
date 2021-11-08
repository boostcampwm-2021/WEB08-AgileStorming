import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { clock, plusCircle } from 'img';
import PrimaryButton from 'components/molecules/PrimaryButton';

const Wrapper = styled.div`
  ${({ theme }) => theme.flex.row}
  align-items: center;
  position: fixed;
  bottom: 50px;
  left: 50px;
  > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const useHistoryBtnClick = () => {
  const hitory = useHistory();

  const handleHistoryBtnClick = () => {
    hitory.push('/history');
  };

  return handleHistoryBtnClick;
};

const MindmapWrapper = () => {
  const handleHistoryBtnClick = useHistoryBtnClick();
  const handlePlusNodeBtnClick = () => {};

  return (
    <Wrapper>
      <PrimaryButton onClick={handleHistoryBtnClick}>
        <img src={clock} alt='히스토리 버튼' />
      </PrimaryButton>

      <PrimaryButton onClick={handlePlusNodeBtnClick}>
        <img src={plusCircle} alt='노드 추가 버튼' />
        {'노드 추가하기'}
      </PrimaryButton>
    </Wrapper>
  );
};

export default MindmapWrapper;
