import styled from '@emotion/styled';
import { getDrawShape, TRect } from 'utils/helpers';

interface IProps {
  rect: TRect | null;
}

const Svg = styled.svg<IProps>`
  left: ${({ rect }) => rect!.x + 'px'};
  top: ${({ rect }) => rect!.y + 'px'};
  width: ${({ rect }) => rect!.width + 'px'};
  height: ${({ rect }) => rect!.height + 'px'};
  overflow: hidden;
  position: absolute;
  z-index: -100;
`;

const Path: React.FC<IProps> = ({ rect }) => {
  if (!rect) return <></>;

  return (
    <Svg rect={rect} xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
      <path fill='none' stroke='#888888' d={getDrawShape(rect!)} strokeWidth='1' strokeLinecap='round'></path>
    </Svg>
  );
};

export default Path;
