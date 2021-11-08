import MindmapTemplate from 'components/templates/Mindmap';
import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { selectedNodeState } from 'recoil/mindmap';

const MindmapPage = () => {
  useHandleClick();

  return <MindmapTemplate />;
};

const useHandleClick = () => {
  const setSelectedNodeId = useSetRecoilState(selectedNodeState);

  const HandleNodeClick = useCallback(({ target }: MouseEvent) => {
    const currentTarget = target as HTMLElement;
    if (!currentTarget.id) return setSelectedNodeId(null);

    setSelectedNodeId(currentTarget.id);
  }, []);

  useEffect(() => {
    window.addEventListener('click', HandleNodeClick);
    return () => window.removeEventListener('click', HandleNodeClick);
  }, []);
};

export default MindmapPage;
