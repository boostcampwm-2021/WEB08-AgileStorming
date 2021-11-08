import styled from '@emotion/styled';
import { BoxButton } from 'components/atoms';
import { useHistory } from 'react-router-dom';
import { clock, plusCircle } from 'img';
import common from 'styles/common';

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
      <BoxButton onClick={handleHistoryBtnClick} color={common.color.white}>
        <img src={clock} alt='히스토리 버튼' />
      </BoxButton>
      <BoxButton onClick={handlePlusNodeBtnClick} color={common.color.white}>
        <img src={plusCircle} alt='노드 추가 버튼' />
        {'노드 추가하기'}
      </BoxButton>
    </Wrapper>
  );
};

export default MindmapWrapper;
