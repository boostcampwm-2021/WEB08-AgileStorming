import { MindmapTemplate } from 'components/templates';
import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { selectedNodeIdState } from 'recoil/node';

const MindmapPage = () => {
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState);

  const HandleNodeClick = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    const eventTarget = event.target as HTMLElement;

    if (!eventTarget.classList.contains('mindmap-area')) return;
    if (!eventTarget.classList.contains('node')) return setSelectedNodeId(null);

    setSelectedNodeId(Number(eventTarget.id));
  }, []);

  useEffect(() => {
    window.addEventListener('click', HandleNodeClick);
    return () => window.removeEventListener('click', HandleNodeClick);
  }, []);

  return <MindmapTemplate />;
};

export default MindmapPage;
