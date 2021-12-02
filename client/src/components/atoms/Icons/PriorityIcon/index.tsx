import { StyledIconImg } from './style';
import { sirenGreenIcon, sirenOrangeIcon, sirenRedIcon } from 'img';
import { TPriority } from 'types/event';

interface IProps {
  priority: TPriority;
}

const sirenSrc: { [key in TPriority]: string } = {
  낮음: sirenGreenIcon,
  보통: sirenOrangeIcon,
  높음: sirenRedIcon,
};

const PriorityIcon: React.FC<IProps> = ({ priority }) => {
  return <StyledIconImg src={sirenSrc[priority]} alt={'중요도'} />;
};

export default PriorityIcon;
