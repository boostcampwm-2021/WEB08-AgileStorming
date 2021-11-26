import { useCallback, useEffect, useRef } from 'react';

interface ICoord {
  screenX: number;
  screenY: number;
}

const useDragBackground = (dragTarget: HTMLDivElement | null | (Window & typeof globalThis) = window) => {
  const lastCoord = useRef<ICoord | null>(null);
  const draggable = useRef(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = useCallback(
    ({ screenX, screenY, target }: MouseEvent) => {
      if (!target) return;
      if ((target as HTMLElement).tagName !== 'DIV') return;

      const isTargetHasClassName = (className: string) => (target as HTMLElement).className.includes(className);

      if (!isTargetHasClassName('background') && !isTargetHasClassName('child-container') && !isTargetHasClassName('node-container'))
        return;
      console.log(1);
      draggable.current = true;
      lastCoord.current = { screenX, screenY };
    },
    [draggable.current, lastCoord.current]
  );

  const handleMouseUp = useCallback(() => {
    if (!draggable.current) return;
    draggable.current = false;
    lastCoord.current = null;
  }, [draggable.current, lastCoord.current]);

  const handleMouseMove = useCallback(
    ({ screenX, screenY, target }: MouseEvent) => {
      if (!draggable.current || !lastCoord.current || !dragTarget) return;
      if (timer.current) return;

      if (dragTarget === window && (target as HTMLElement).closest('.history')) return;
      timer.current = setTimeout(() => {
        timer.current = null;
        if (!lastCoord.current) return;
        const diffX = lastCoord.current.screenX - screenX;
        const diffY = lastCoord.current.screenY - screenY;

        dragTarget.scrollBy(diffX, diffY);
        lastCoord.current = { screenX, screenY };
      }, 16);
    },
    [dragTarget, draggable.current, lastCoord.current, timer.current]
  );

  const handleMouseLeave = useCallback(() => {
    if (!draggable.current) return;
    draggable.current = false;
    lastCoord.current = null;
  }, [draggable.current, lastCoord.current]);

  const addListeners = useCallback(() => {
    if (!dragTarget) return;

    dragTarget.addEventListener('mousedown', handleMouseDown as EventListener);
    dragTarget.addEventListener('mousemove', handleMouseMove as EventListener);
    dragTarget.addEventListener('mouseup', handleMouseUp);
    dragTarget.addEventListener('mouseleave', handleMouseLeave);
  }, [dragTarget, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave]);

  const removeListeners = useCallback(() => {
    if (!dragTarget) return;

    dragTarget.removeEventListener('mousedown', handleMouseDown as EventListener);
    dragTarget.removeEventListener('mousemove', handleMouseMove as EventListener);
    dragTarget.removeEventListener('mouseup', handleMouseUp);
    dragTarget.removeEventListener('mouseleave', handleMouseLeave);
  }, [dragTarget, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave]);

  useEffect(() => {
    if (dragTarget === null) return;

    addListeners();
    if (dragTarget === window) {
      window.scrollBy({ left: 2500 - innerWidth / 2, top: 2500 - innerHeight / 2 });
    }

    return () => {
      removeListeners();
      if (dragTarget === window) window.scrollTo(0, 0);
    };
  }, [dragTarget, addListeners, removeListeners]);
};

export default useDragBackground;
