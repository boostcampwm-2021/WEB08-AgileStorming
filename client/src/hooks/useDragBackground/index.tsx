import { useEffect, useRef } from 'react';
import { getInitPosition, addListeners, removeListeners, initTarget, TCoord } from './functions';
interface IProps {
  startPosition: 'mid' | 'end';
}

const useDragBackground = ({ startPosition }: IProps) => {
  const lastCoord = useRef<TCoord | null>(null);
  const draggable = useRef(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dragRef.current || !containerRef.current) return;

    const target = dragRef.current as HTMLDivElement;
    const container = containerRef.current as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    const factors = { draggable, target, timer, lastCoord };
    const { left, top } = getInitPosition({ container, rect, startPosition });

    initTarget({ target, top, left });

    addListeners(container, factors);

    return () => removeListeners(container, factors);
  });

  return { containerRef: containerRef, dragRef: dragRef };
};

export default useDragBackground;
