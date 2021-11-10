import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { clock, plusCircle } from 'img';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getNextMapState, IMindNodes, mindmapState, mindNodesState } from 'recoil/mindmap';
import { getId, idxToLevel, levelToIdx } from 'utils/helpers';
import { BoxButton } from 'components/atoms';
import useProjectId from 'hooks/useRoomId';
import { selectedNodeIdState } from 'recoil/node';

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
  selectedNodeId: number | null;
}

const TEMP_NODE_ID = -1;

const createTempNode = ({ mindNodes, selectedNodeId }: ITempNodeParams) => {
  const parentNode = mindNodes.get(selectedNodeId ?? 0);
  const level = idxToLevel(levelToIdx(parentNode!.level) + 1);

  const tempNode = { nodeId: TEMP_NODE_ID, level: level, content: '', children: [] };

  parentNode!.children.push(TEMP_NODE_ID);
  mindNodes.set(parentNode!.nodeId, parentNode!);
  mindNodes.set(TEMP_NODE_ID, tempNode);

  const newMapState = getNextMapState({ mindNodes, rootId: 0 });

  return newMapState;
};

const MindmapWrapper: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useRecoilState(selectedNodeIdState);
  const setMindMap = useSetRecoilState(mindmapState);
  const mindNodes = useRecoilValue(mindNodesState);
  const hitory = useHistory();
  const projectId = useProjectId();

  const handleHistoryBtnClick = () => {
    hitory.push(`/history/${projectId}`);
  };

  const handlePlusNodeBtnClick = () => {
    if (selectedNodeId === -1) return;

    const newMapState = createTempNode({ mindNodes, selectedNodeId });
    setSelectedNodeId(TEMP_NODE_ID);
    setMindMap(newMapState);
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
