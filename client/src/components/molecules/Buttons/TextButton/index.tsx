import React from 'react';
import { SmallText, TransparentButton } from 'components/atoms';
import * as Types from 'styles/common';
import { StyledTextButton } from './style';

interface IProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  textColor: Types.TColor;
  textWeight?: string;
  margin: string;
}

const TextButton: React.FC<IProps> = ({ onClick, text, textColor, textWeight, margin }) => {
  return (
    <StyledTextButton margin={margin}>
      <TransparentButton onClick={onClick}>
        <SmallText color={textColor} weight={textWeight}>
          {text}
        </SmallText>
      </TransparentButton>
    </StyledTextButton>
  );
};

export default TextButton;
