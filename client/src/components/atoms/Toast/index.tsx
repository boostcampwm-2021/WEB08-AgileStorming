import { useRecoilState } from 'recoil';
import { StyledToast, StyledToastContainer } from './style';
import { toastState } from 'recoil/toast';

const Toast = () => {
  const [toastList] = useRecoilState(toastState);
  return (
    <StyledToastContainer>
      {toastList.map(({ id, show, message }) => (
        <StyledToast key={id} show={show}>
          {message}
        </StyledToast>
      ))}
    </StyledToastContainer>
  );
};

export default Toast;
