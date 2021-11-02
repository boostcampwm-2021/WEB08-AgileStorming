import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { IToast, toastState } from 'recoil/toast';
import { Theme } from '@emotion/react';

interface IStyledToast {
  theme?: Theme;
  show: IToast['show'];
}

const StyledToast = styled.div<IStyledToast>`
  ${(props) => props.theme.flex.columnCenter}
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  padding: ${(props) => props.theme.padding.large};
  border-radius: 8px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.normal};
  color: ${(props) => props.theme.color.white};
  background: ${(props) => props.theme.color.black};
  opacity: ${(props) => (props.show ? '0.7' : '0')};
  visibility: ${(props) => (props.show ? null : 'hidden')};
  transition: ${(props) => (props.show ? 'opacity 300ms' : 'opacity 200ms, visibility 200ms')};
`;

const Toast = () => {
  const [toastObject] = useRecoilState(toastState);
  return (
    <>
      <StyledToast show={toastObject.show}>{toastObject.message}</StyledToast>
    </>
  );
};

export default Toast;
