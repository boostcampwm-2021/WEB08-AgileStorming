import styled from '@emotion/styled';

interface IStyleProps {
  margin: string;
}

const StyledTextButton = styled.div<IStyleProps>`
  width: fit-content;
  height: fit-content;
  margin: ${(props) => props.margin};
  cursor: pointer!;
`;

export { StyledTextButton };
