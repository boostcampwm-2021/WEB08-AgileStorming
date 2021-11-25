import { Background } from 'components/atoms';

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const MindmapBackground: React.FC<IProps> = ({ className, children }) => {
  return (
    <Background className={className} bgSize='over' bgColor='bgWhite'>
      {children}
    </Background>
  );
};

export default MindmapBackground;
