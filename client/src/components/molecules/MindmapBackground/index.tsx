import { useEffect, useRef } from 'react';
import Background from 'components/atoms/Background';
import { getCenterCoord, MINDMAP_BG_SIZE, numToPx } from 'utils/helpers';

interface ICoord {
  clientX: number;
  clientY: number;
}

interface IProps {
  children?: React.ReactNode;
}

const [centerX, centerY] = getCenterCoord(window.innerWidth, window.innerHeight);

const MindmapBackground = ({ children }: IProps) => {
  const lastCoord = useRef<ICoord | null>(null);
  const draggable = useRef(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const toggleDraggable = () => (draggable.current = !draggable.current);

  const handleWindowMouseDown = ({ clientX, clientY }: MouseEvent) => {
    toggleDraggable();
    lastCoord.current = { clientX, clientY };
  };

  const handleWindowMouseUp = () => {
    toggleDraggable();
    lastCoord.current = null;
  };

  const handleWindowMouseMove = ({ clientX, clientY }: MouseEvent) => {
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
      30,
      clientX,
      clientY
    );
  };

  const addListeners = () => {
    window.addEventListener('mousedown', handleWindowMouseDown);
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
  };

  const removeListeners = () => {
    window.removeEventListener('mousedown', handleWindowMouseDown);
    window.removeEventListener('mousemove', handleWindowMouseMove);
    window.removeEventListener('mouseup', handleWindowMouseUp);
  };

  useEffect(() => {
    window.scrollTo(centerX, centerY);
    addListeners();

    return removeListeners;
  }, []);

  return (
    <Background width={numToPx(MINDMAP_BG_SIZE.WIDTH)} height={numToPx(MINDMAP_BG_SIZE.HEIGHT)}>
      {children}
    </Background>
  );
};

export default MindmapBackground;
