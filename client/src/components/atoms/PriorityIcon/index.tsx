import { TPriority } from 'types/event';
import { sirenGreenIcon, sirenOrangeIcon, sirenRedIcon } from 'img';
import styled from '@emotion/styled';

interface IProps {
  priority: TPriority;
}

const StyledIconImg = styled.img`
  background-color: ${(props) => props.theme.color.white};
  padding: 0.1rem;
  border-radius: 1rem;
`;

const sirenSrc: { [key in TPriority]: string } = {
  낮음: sirenGreenIcon,
  보통: sirenOrangeIcon,
  높음: sirenRedIcon,
};

const PriorityIcon: React.FC<IProps> = ({ priority }) => {
  return <StyledIconImg src={sirenSrc[priority]} alt={'중요도'} />;
};

export default PriorityIcon;
