import styled from '@emotion/styled';
import { Theme } from '@emotion/react';

interface IStyledProps {
  theme?: Theme;
  visible: boolean;
}

const StyledModalBox = styled.div<IStyledProps>`
  ${(props) => props.theme.flex.center};
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.white};
  padding: ${(props) => props.theme.padding.xxxlarge};
  z-index: 1000;
`;

export default StyledModalBox;
