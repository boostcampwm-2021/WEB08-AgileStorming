import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { clock, plusCircle } from 'img';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IMindNodes, mindNodesState, selectedNodeState } from 'recoil/mindmap';
import { getId, idxToLevel, levelToIdx } from 'utils/helpers';
import { BoxButton } from 'components/atoms';
import useProjectId from 'hooks/useRoomId';

const Wrapper = styled.div`
  ${({ theme }) => theme.flex.row}
  align-items: center;
  position: fixed;
  bottom: 50px;
  left: 50px;
  gap: 1rem;
`;

interface ITempNodeParams {
  mindNodes: IMindNodes;
  selectedNodeId: string | null;
}

const createTempNode = ({ mindNodes, selectedNodeId }: ITempNodeParams) => {
  const nodeId = selectedNodeId === null ? 0 : getId(selectedNodeId);
  const parentNode = mindNodes.get(nodeId);
  const level = idxToLevel(levelToIdx(parentNode!.level) + 1);
  const tempNode = { nodeId: -1, level: level, content: '', children: [] };

  parentNode!.children.push(-1);
  mindNodes.set(-1, tempNode);

  const tempNodeId = `${level}#-1`;
  return tempNodeId;
};

const MindmapWrapper: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useRecoilState(selectedNodeState);
  const mindNodes = useRecoilValue(mindNodesState);
  const hitory = useHistory();
  const projectId = useProjectId();

  const handleHistoryBtnClick = () => {
    hitory.push(`/history/${projectId}`);
  };

  const handlePlusNodeBtnClick = () => {
    if (selectedNodeId && getId(selectedNodeId) === -1) return;

    const tempNodeId = createTempNode({ mindNodes, selectedNodeId });
    setSelectedNodeId(tempNodeId);
  };

  return (
    <Wrapper>
      <BoxButton onClick={handleHistoryBtnClick} btnStyle={'large'} color={'primary1'}>
        <img src={clock} alt='히스토리 버튼'></img>
      </BoxButton>
      <BoxButton onClick={handlePlusNodeBtnClick} btnStyle={'large'} color={'primary1'} margin={'0 1rem'}>
        <img src={plusCircle} alt='노드 추가 버튼'></img>
        {'노드 추가하기'}
      </BoxButton>
    </Wrapper>
  );
};

export default MindmapWrapper;
