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
      const eventParent = eventTarget?.parentNode as HTMLElement;

      if (eventTarget.classList.contains('child-container') || eventTarget.tagName === 'svg') return setSelectedNodeId(null);
      if (eventParent?.classList.contains('node')) return setSelectedNodeId(Number(eventParent.id));
      if (!eventTarget.classList.contains('mindmap-area')) return;
      if (eventTarget.classList.contains('node')) return setSelectedNodeId(Number(eventTarget.id));

      setSelectedNodeId(null);
    },
    [setSelectedNodeId]
  );

  useEffect(() => {
    window.addEventListener('click', HandleNodeClick);
    return () => window.removeEventListener('click', HandleNodeClick);
  }, [HandleNodeClick]);

  return (
    <CommonLayout>
      <MindmapTemplate />
    </CommonLayout>
  );
};

export default MindmapPage;
