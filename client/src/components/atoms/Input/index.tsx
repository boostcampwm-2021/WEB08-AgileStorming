import React, { useEffect, useRef } from 'react';
import { StyledInput, TStyle } from './style';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFocus?: () => void;
  inputStyle?: TStyle;
  margin?: string;
  useEnter?: boolean;
}

const Input: React.FC<IProps> = ({ onFocus = () => {}, useEnter = false, inputStyle = 'normal', margin = '0', ...props }) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.isComposing) return;
      ref.current?.blur();
    }
  };
  const waitEnter = () => {
    onFocus();
    if (useEnter) {
      document.addEventListener('keydown', handleEnter);
    }
  };
  const stopWaitEnter = () => document.removeEventListener('keydown', handleEnter);

  useEffect(() => {
    return () => stopWaitEnter();
  }, []);

  return (
    <StyledInput
      ref={ref}
      onFocus={waitEnter}
      onBlur={stopWaitEnter}
      inputStyle={inputStyle}
      margin={margin}
      autoComplete={'off'}
      {...props}
    />
  );
};

export default Input;
