import styled from '@emotion/styled';
import { backwardBtn, playBtn, forwardBtn } from 'img';
import { IconButton } from '..';

const PlayController = () => {
  const handleBackwardBtnClick = () => {};
  const handlePlayBtnClick = () => {};
  const handleForwardBtnClick = () => {};

  return (
    <Wrapper>
      <IconButton onClick={handleBackwardBtnClick} imgSrc={backwardBtn} />
      <IconButton onClick={handlePlayBtnClick} imgSrc={playBtn} />
      <IconButton onClick={handleForwardBtnClick} imgSrc={forwardBtn} />
    </Wrapper>
  );
};

export default PlayController;

const Wrapper = styled.div`
  ${({ theme }) => theme.flex.row}
`;
