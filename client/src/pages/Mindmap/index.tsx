import { MindmapTemplate } from 'components/templates';
import CommonLayout from 'components/templates/CommonLayout';
import useHistoryEmitter from 'hooks/useHistoryEmitter';
import useDragBackground from 'hooks/useDragBackground';
import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { selectedNodeIdState } from 'recoil/node';

const MindmapPage = () => {
  const setSelectedNodeId = useSetRecoilState(selectedNodeIdState);
  const { focusNode } = useHistoryEmitter();
  useDragBackground();

  const selectNode = (nodeId: number | null) => {
    setSelectedNodeId(nodeId);
    focusNode(nodeId);
  };

  const HandleNodeClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      const eventTarget = event.target as HTMLElement;
      const eventParent = eventTarget?.parentNode as HTMLElement;

      if (eventTarget.classList.contains('child-container') || eventTarget.tagName === 'svg') return selectNode(null);
      if (eventParent?.classList.contains('node')) return selectNode(Number(eventParent.id));
      if (!eventTarget.classList.contains('mindmap-area')) return;
      if (eventTarget.classList.contains('node')) return selectNode(Number(eventTarget.id));

      selectNode(null);
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
