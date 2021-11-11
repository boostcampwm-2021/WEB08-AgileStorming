import styled from '@emotion/styled';
import { backwardBtn, playBtn, forwardBtn } from 'img';
import { IconButton } from '..';

const PlayController = () => {
  const handleBackwardBtnClick = () => {};
  const handlePlayBtnClick = () => {};
  const handleForwardBtnClick = () => {};

  return (
    <Wrapper>
      <IconButton onClick={handleBackwardBtnClick} imgSrc={backwardBtn} altText='처음으로 이동하기 버튼' />
      <IconButton onClick={handlePlayBtnClick} imgSrc={playBtn} altText='재생하기 버튼' />
      <IconButton onClick={handleForwardBtnClick} imgSrc={forwardBtn} altText='끝으로 이동하기 버튼' />
    </Wrapper>
  );
};

export default PlayController;

const Wrapper = styled.div`
  ${({ theme }) => theme.flex.row}
`;
