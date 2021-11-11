import { useCallback, useEffect, useRef } from 'react';
import Background from 'components/atoms/Background';
import { getCenterCoord } from 'utils/helpers';

interface ICoord {
  clientX: number;
  clientY: number;
}

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const [centerX, centerY] = getCenterCoord(window.innerWidth, window.innerHeight);

const MindmapBackground: React.FC<IProps> = ({ className, children }) => {
  const lastCoord = useRef<ICoord | null>(null);
  const draggable = useRef(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const toggleDraggable = () => (draggable.current = !draggable.current);

  const handleWindowMouseDown = useCallback(({ clientX, clientY, target }: MouseEvent) => {
    if ((target as HTMLElement).id !== 'mindmapBackground') return;
    toggleDraggable();
    lastCoord.current = { clientX, clientY };
  }, []);

  const handleWindowMouseUp = useCallback(({ target }: MouseEvent) => {
    if ((target as HTMLElement).id !== 'mindmapBackground') return;
    toggleDraggable();
    lastCoord.current = null;
  }, []);

  const handleWindowMouseMove = useCallback(({ clientX, clientY }: MouseEvent) => {
    if (!draggable.current || !lastCoord.current) return;
    if (timer.current) return;

    timer.current = setTimeout(
      (clientX, clientY) => {
        timer.current = null;

        if (!lastCoord.current) return;
        const diffX = lastCoord.current.clientX - clientX;
        const diffY = lastCoord.current.clientY - clientY;

        window.scrollBy(diffX, diffY);
        lastCoord.current = { clientX, clientY };
      },
      20,
      clientX,
      clientY
    );
  }, []);

  const addListeners = useCallback(() => {
    window.addEventListener('mousedown', handleWindowMouseDown);
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
  }, [handleWindowMouseDown, handleWindowMouseMove, handleWindowMouseUp]);

  const removeListeners = useCallback(() => {
    window.removeEventListener('mousedown', handleWindowMouseDown);
    window.removeEventListener('mousemove', handleWindowMouseMove);
    window.removeEventListener('mouseup', handleWindowMouseUp);
  }, [handleWindowMouseDown, handleWindowMouseMove, handleWindowMouseUp]);

  useEffect(() => {
    window.scrollTo(centerX, centerY);
    addListeners();

    return removeListeners;
  }, [addListeners, removeListeners]);

  return (
    <Background id={'mindmapBackground'} className={className} bgSize='over' bgColor='bgWhite'>
      {children}
    </Background>
  );
};

export default MindmapBackground;
