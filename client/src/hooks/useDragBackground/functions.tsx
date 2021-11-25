import { numToPx, pxToNum } from 'utils/helpers';

interface ICoord {
  clientX: number;
  clientY: number;
}

interface ITargetParams {
  target: HTMLDivElement;
  top: number;
  left: number;
}

interface IHandlerParams {
  draggable: React.MutableRefObject<boolean>;
  lastCoord: React.MutableRefObject<ICoord | null>;
  timer: React.MutableRefObject<NodeJS.Timeout | null>;
  target: HTMLDivElement;
}

interface IGetInitPositionParams {
  container: HTMLDivElement;
  rect: DOMRect;
  startPosition: 'mid' | 'end';
}

const getInitPosition = ({ container, rect, startPosition }: IGetInitPositionParams) =>
  startPosition === 'mid'
    ? {
        left: rect.width / 2,
        top: rect.height / 2,
      }
    : { left: container.scrollWidth - rect.width / 2, top: rect.height / 2 };

const initTarget = ({ target, top, left }: ITargetParams) => {
  target.style.top = numToPx(top);
  target.style.left = numToPx(left);

  target.scrollIntoView({ block: 'center', inline: 'center' });
};

const moveTarget = ({ target, top, left }: ITargetParams) => {
  target.style.top = numToPx(pxToNum(target.style.top) + top);
  target.style.left = numToPx(pxToNum(target.style.left) + left);

  target.scrollIntoView({ block: 'center', inline: 'center' });
};

const handleMouseDown =
  ({ draggable, lastCoord }: IHandlerParams) =>
  ({ clientX, clientY, target }: MouseEvent) => {
    if ((target as HTMLElement).tagName !== 'DIV') return;
    const isTargetHasClassName = (className: string) => (target as HTMLElement).className.includes(className);
    if (!isTargetHasClassName('background') && !isTargetHasClassName('child-container') && !isTargetHasClassName('node-container')) return;

    draggable.current = true;
    lastCoord.current = { clientX, clientY };
  };

const handleMouseUp =
  ({ draggable, lastCoord }: IHandlerParams) =>
  () => {
    if (!draggable.current) return;
    draggable.current = false;
    lastCoord.current = null;
  };

const handleMouseMove =
  ({ draggable, lastCoord, timer, target }: IHandlerParams) =>
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
  };

const handleMouseLeave =
  ({ draggable, lastCoord }: IHandlerParams) =>
  () => {
    if (!draggable.current) return;
    draggable.current = false;
    lastCoord.current = null;
  };

const addListeners = (container: HTMLDivElement, factors: THandlerParams) => {
  container.addEventListener('mousedown', handleMouseDown(factors));
  container.addEventListener('mousemove', handleMouseMove(factors));
  container.addEventListener('mouseup', handleMouseUp(factors));
  container.addEventListener('mouseleave', handleMouseLeave(factors));
};

const removeListeners = (container: HTMLDivElement, factors: THandlerParams) => {
  container.removeEventListener('mousedown', handleMouseDown(factors));
  container.removeEventListener('mousemove', handleMouseMove(factors));
  container.removeEventListener('mouseup', handleMouseUp(factors));
  container.removeEventListener('mouseleave', handleMouseLeave(factors));
};

export { getInitPosition, addListeners, removeListeners, initTarget };
export type TCoord = ICoord;
export type THandlerParams = IHandlerParams;
