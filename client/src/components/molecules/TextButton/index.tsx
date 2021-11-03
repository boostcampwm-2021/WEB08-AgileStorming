import React from 'react';
import { SmallText, TransparentButton } from 'components/atoms';
import * as Types from 'styles/common';
import styled from '@emotion/styled';

interface IProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  textColor: Types.TColor;
  textWeight?: string;
  margin: string;
}

interface IStyleProps {
  margin: string;
}

const StyledTextButton = styled.div<IStyleProps>`
  width: fit-content;
  height: fit-content;
  margin: ${(props) => props.margin};
`;

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
