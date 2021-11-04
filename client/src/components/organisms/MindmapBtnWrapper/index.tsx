import styled from '@emotion/styled';
import { BoxButton } from 'components/atoms';
import { useHistory } from 'react-router-dom';
import { clock, plusCircle } from 'img';
import common from 'styles/common';

const Wrapper = styled.div`
  ${(props) => props.theme.flex.row}
  align-items: center;
  /* justify-content: space-between; */
  position: fixed;
  bottom: 50px;
  left: 50px;
  /* width: 200px; */
  > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const MindmapWrapper = () => {
  const hitory = useHistory();
  const handleHistoryBtnClick = () => {
    hitory.push('/history');
  };
  const handlePlusNodeBtnClick = () => {};

  return (
    <Wrapper>
      <BoxButton onClick={handleHistoryBtnClick} color={common.color.white}>
        <img src={clock} alt='히스토리 버튼'></img>
      </BoxButton>
      <BoxButton onClick={handlePlusNodeBtnClick} color={common.color.white}>
        <img src={plusCircle} alt='노드 추가 버튼'></img>
        {'노드 추가하기'}
      </BoxButton>
    </Wrapper>
  );
};

export default MindmapWrapper;
