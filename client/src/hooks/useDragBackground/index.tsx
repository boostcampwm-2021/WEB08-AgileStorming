import { useEffect, useRef } from 'react';
import { getInitPosition, addListeners, removeListeners, initTarget, TCoord } from './functions';

const useDragBackground = () => {
  const lastCoord = useRef<TCoord | null>(null);
  const draggable = useRef(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dragRef.current || !containerRef.current) return;

    const target = dragRef.current as HTMLDivElement;
    const container = containerRef.current as HTMLDivElement;
    const containerRect = container.getBoundingClientRect();
    const factors = { draggable, target, timer, lastCoord };
    const { left, top } = getInitPosition(containerRect);

    initTarget({ target, top, left });

    addListeners(container, factors);

    return () => removeListeners(container, factors);
  }, [dragRef.current, containerRef.current]);

  return { containerRef: containerRef, dragRef: dragRef };
};

export default useDragBackground;
