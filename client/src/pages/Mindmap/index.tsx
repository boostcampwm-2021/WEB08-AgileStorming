import { MindmapTemplate } from 'components/templates';
import CommonLayout from 'components/templates/CommonLayout';
import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { selectedNodeIdState } from 'recoil/node';

const MindmapPage = () => {
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState);

  const HandleNodeClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      const eventTarget = event.target as HTMLElement;

      if (!eventTarget.classList.contains('mindmap-area')) return;
      if (!eventTarget.classList.contains('node')) return setSelectedNodeId(null);

      setSelectedNodeId(Number(eventTarget.id));
    },
    [setSelectedNodeId]
  );

  useEffect(() => {
    window.addEventListener('click', HandleNodeClick);
    return () => window.removeEventListener('click', HandleNodeClick);
  }, [HandleNodeClick]);

  return (
    <CommonLayout>
      <MindmapTemplate />;
    </CommonLayout>
  );
};

export default MindmapPage;
