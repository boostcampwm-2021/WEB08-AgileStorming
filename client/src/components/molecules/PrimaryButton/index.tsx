import { BoxButton } from 'components/atoms';
import { MouseEventHandler } from 'react';
import { common } from 'styles';

interface IProps {
  onClick: MouseEventHandler;
}

const PrimaryButton: React.FC<IProps> = ({ onClick, children }) => (
  <BoxButton onClick={onClick} color={common.color.white}>
    {children}
  </BoxButton>
);

export default PrimaryButton;
