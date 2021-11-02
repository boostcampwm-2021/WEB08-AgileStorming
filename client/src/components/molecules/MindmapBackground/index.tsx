import styled from '@emotion/styled';
import Background from 'components/atoms/Background';
import { useEffect, useRef } from 'react';
import { numToPx } from 'utils/helpers';

enum MINDMAP_BG_SIZE {
  WIDTH = 5000,
  HEIGHT = 5000,
}

interface TempProps {
  x: string;
  y: string;
}

interface ICoord {
  clientX: number;
  clientY: number;
}

const TestDiv = styled.div<TempProps>`
  position: absolute;
  top: ${(props) => props.y};
  left: ${(props) => props.x};
  width: 100px;
  height: 100px;
  background-color: blue;
`;

const divX = numToPx((MINDMAP_BG_SIZE.WIDTH - 100) / 2);
const divY = numToPx((MINDMAP_BG_SIZE.HEIGHT - 100) / 2);

const MindmapBackground = () => {
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
        const diffX = clientX - lastCoord.current.clientX;
        const diffY = clientY - lastCoord.current.clientY;

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
    const centerX = (MINDMAP_BG_SIZE.WIDTH - window.innerWidth) / 2;
    const centerY = (MINDMAP_BG_SIZE.HEIGHT - window.innerHeight) / 2;

    window.scrollTo(centerX, centerY);
    addListeners();

    return removeListeners;
  }, []);

  return (
    <Background width={numToPx(MINDMAP_BG_SIZE.WIDTH)} height={numToPx(MINDMAP_BG_SIZE.HEIGHT)}>
      <TestDiv x={divX} y={divY} />
    </Background>
  );
};

export default MindmapBackground;
