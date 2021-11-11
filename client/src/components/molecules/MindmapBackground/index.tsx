import { Background } from 'components/atoms';
import useDragBackground from 'hooks/useDragBackground';

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const MindmapBackground: React.FC<IProps> = ({ className, children }) => {
  useDragBackground();

  return (
    <Background className={className} bgSize='over' bgColor='bgWhite'>
      {children}
    </Background>
  );
};

export default MindmapBackground;
