import styled from '@emotion/styled';
import Background from 'components/atoms/Background';
import { useEffect, useRef } from 'react';

enum MINDMAP_BG_SIZE {
  WIDTH = 5000,
  HEIGHT = 5000,
}

interface TempProps {
  x: string;
  y: string;
}

const TestDiv = styled.div<TempProps>`
  position: absolute;
  top: ${(props) => props.y};
  left: ${(props) => props.x};
  width: 100px;
  height: 100px;
  background-color: blue;
`;

// const pxToNum = (px: string): number => Number(px.slice(0, -2));
const numToPx = (num: number): string => num + 'px';

interface ICoord {
  clientX: number;
  clientY: number;
}

const MindmapBackground = () => {
  const lastCoord = useRef<ICoord | null>(null);
  const draggable = useRef(false);

  const centerX = (MINDMAP_BG_SIZE.WIDTH - window.innerWidth) / 2;
  const centerY = (MINDMAP_BG_SIZE.HEIGHT - window.innerHeight) / 2;

  const divX = numToPx((MINDMAP_BG_SIZE.WIDTH - 100) / 2);
  const divY = numToPx((MINDMAP_BG_SIZE.HEIGHT - 100) / 2);

  const toggleDraggable = () => (draggable.current = !draggable.current);

  const startDrag = ({ clientX, clientY }: MouseEvent) => {
    toggleDraggable();
    lastCoord.current = { clientX, clientY };
  };
  const endDrag = () => {
    toggleDraggable();
    lastCoord.current = null;
  };

  const drag = ({ clientX, clientY }: MouseEvent) => {
    if (!lastCoord.current) return;
    const diffX = clientX - lastCoord.current.clientX;
    const diffY = clientY - lastCoord.current.clientY;

    window.scrollBy(diffX, diffY);
    lastCoord.current = { clientX, clientY };
  };

  useEffect(() => {
    window.scrollTo(centerX, centerY);

    window.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', endDrag);

    return () => {
      window.removeEventListener('mousedown', startDrag);
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('mouseup', endDrag);
    };
  }, []);

  return (
    <Background width={numToPx(MINDMAP_BG_SIZE.WIDTH)} height={numToPx(MINDMAP_BG_SIZE.HEIGHT)}>
      <TestDiv x={divX} y={divY} />
    </Background>
  );
};

export default MindmapBackground;
