import { Background, DragTarget } from 'components/atoms';
import useDragBackground from 'hooks/useDragBackground';

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const MindmapBackground: React.FC<IProps> = ({ className, children }) => {
  const { containerRef, dragRef } = useDragBackground();

  return (
    <Background refProp={containerRef} className={className} bgSize='over' bgColor='bgWhite'>
      {children}
      <DragTarget ref={dragRef} />
    </Background>
  );
};

export default MindmapBackground;
