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

  const HandleNodeClick = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    const currentTarget = event.target as HTMLElement;

    if (!currentTarget.classList.contains('mindmap-area')) return;
    if (!currentTarget.classList.contains('node')) return setSelectedNodeId(null);

    setSelectedNodeId(currentTarget.id);
  }, []);

  useEffect(() => {
    window.addEventListener('click', HandleNodeClick);
    return () => window.removeEventListener('click', HandleNodeClick);
  }, []);
};

export default MindmapPage;
