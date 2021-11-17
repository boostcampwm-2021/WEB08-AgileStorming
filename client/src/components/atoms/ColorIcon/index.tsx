import { StyledIcon } from './style';

interface IProps {
  color: string;
}

const ColorIcon: React.FC<IProps> = ({ color }) => {
  return <StyledIcon color={color}>{`@`}</StyledIcon>;
};

export default ColorIcon;
