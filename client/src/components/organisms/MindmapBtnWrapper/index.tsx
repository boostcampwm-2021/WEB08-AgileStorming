import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { clock, plusCircle } from 'img';
import PrimaryButton from 'components/molecules/PrimaryButton';
import { useRecoilState, useRecoilValue } from 'recoil';
import { mindmapState, selectedNodeState } from 'recoil/mindmap';
import { getId, idxToLevel, levelToIdx } from 'utils/helpers';

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
  const [selectedNodeId, setSelectedNodeId] = useRecoilState(selectedNodeState);

  const handleHistoryBtnClick = useHistoryBtnClick();
  const mindNodes = useRecoilValue(mindmapState).mindNodes;

  const handlePlusNodeBtnClick = () => {
    if (selectedNodeId && getId(selectedNodeId) === -1) return;
    const nodeId = selectedNodeId === null ? 0 : getId(selectedNodeId);
    const parentNode = mindNodes.get(nodeId);
    const parentNodeIdx = levelToIdx(parentNode!.level);
    const level = idxToLevel(parentNodeIdx + 1);
    const tempNode = { nodeId: -1, level: level, content: '', children: [] };
    parentNode?.children.push(-1);
    mindNodes.set(-1, tempNode);
    setSelectedNodeId(`${level}#-1`);
  };

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
