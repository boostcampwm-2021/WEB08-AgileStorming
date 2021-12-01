import styled from '@emotion/styled';

interface IStyledProps {
  margin: string;
  zIdx: string;
}

const StyledTransparentButton = styled.button<IStyledProps>`
  border: none;
  background: transparent;
  margin: ${({ margin }) => margin};
  z-index: ${({ zIdx }) => zIdx};
  padding: 0;
  width: fit-content;
  cursor: pointer;
`;

export { StyledTransparentButton };
