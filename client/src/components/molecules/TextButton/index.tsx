import React from 'react';
import { SmallText, TransparentButton } from 'components/atoms';
import * as Types from 'styles/common';

interface IProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  textColor: Types.TColor;
  textWeight?: string;
}

const TextButton: React.FC<IProps> = ({ onClick, text, textColor, textWeight }) => {
  return (
    <TransparentButton onClick={onClick}>
      <SmallText color={textColor} weight={textWeight}>
        {text}
      </SmallText>
    </TransparentButton>
  );
};

export default TextButton;
