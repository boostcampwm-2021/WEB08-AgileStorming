import { useCallback, useEffect, useRef } from 'react';
import { numToPx, pxToNum } from 'utils/helpers';

interface ICoord {
  clientX: number;
  clientY: number;
}

interface IMoveTargetProps {
  target: HTMLDivElement;
  top: number;
  left: number;
}

type TStartPosition = 'start' | 'mid' | 'end';

const getInitPosition = {
  start: (rect: DOMRect) => [rect.left, rect.top],
  mid: (rect: DOMRect) => [rect.width / 2, rect.height / 2],
  end: (rect: DOMRect) => [rect.width, rect.height],
};

const targetInit = ({ target, top, left }: IMoveTargetProps) => {
  target.style.top = numToPx(top);
  target.style.left = numToPx(left);

  target.scrollIntoView({ block: 'center', inline: 'center' });
};

const moveTarget = ({ target, top, left }: IMoveTargetProps) => {
  target.style.top = numToPx(pxToNum(target.style.top) + top);
  target.style.left = numToPx(pxToNum(target.style.left) + left);

  target.scrollIntoView({ block: 'center', inline: 'center' });
};

const useDragBackground = (startPosition: TStartPosition) => {
  const lastCoord = useRef<ICoord | null>(null);
  const draggable = useRef(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(({ clientX, clientY, target }: MouseEvent) => {
    if ((target as HTMLElement).tagName !== 'DIV') return;
    if (!(target as HTMLElement).className.includes('background')) return;

    draggable.current = true;
    lastCoord.current = { clientX, clientY };
  }, []);

  const handleMouseUp = useCallback(({ target }: MouseEvent) => {
    if ((target as HTMLElement).tagName !== 'DIV') return;
    if (!(target as HTMLElement).className.includes('background')) return;

    draggable.current = false;
    lastCoord.current = null;
  }, []);

  const handleMouseMove = useCallback(
    (target: HTMLDivElement) =>
      ({ clientX, clientY }: MouseEvent) => {
        if (!draggable.current || !lastCoord.current) return;
        if (timer.current) return;

        timer.current = setTimeout(
          (nowClientX, nowClientY, movingTarget) => {
            timer.current = null;

            if (!lastCoord.current) return;
            const diffX = lastCoord.current.clientX - nowClientX;
            const diffY = lastCoord.current.clientY - nowClientY;

            moveTarget({ target: movingTarget, top: diffY, left: diffX });
            lastCoord.current = { clientX: nowClientX, clientY: nowClientY };
          },
          20,
          clientX,
          clientY,
          target
        );
      },
    []
  );

  const addListeners = useCallback(
    (container: HTMLDivElement, target: HTMLDivElement) => {
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mousemove', handleMouseMove(target));
      container.addEventListener('mouseup', handleMouseUp);
    },
    [handleMouseDown, handleMouseMove, handleMouseUp]
  );

  const removeListeners = useCallback(
    (container: HTMLDivElement, target: HTMLDivElement) => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove(target));
      container.removeEventListener('mouseup', handleMouseUp);
    },
    [handleMouseDown, handleMouseMove, handleMouseUp]
  );

  useEffect(() => {
    if (!dragRef.current || !containerRef.current) return;

    const target = dragRef.current as HTMLDivElement;
    const container = containerRef.current as HTMLDivElement;
    const containerRect = container.getBoundingClientRect();
    const [left, top] = getInitPosition[startPosition](containerRect);

    targetInit({ target, top, left });

    addListeners(container, target);

    return () => removeListeners(container, target);
  }, [addListeners, removeListeners, dragRef.current, containerRef.current]);

  return [containerRef, dragRef];
};

export default useDragBackground;
