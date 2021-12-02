import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

interface IStyledProps {
  theme?: Theme;
  visible: boolean;
}

const StyledModalOverlay = styled.div<IStyledProps>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
`;

export default StyledModalOverlay;
