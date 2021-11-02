import styled from "@emotion/styled";

interface IStyleProps {
  margin?: string;
}

const Input = styled.input`
  all:unset;
  box-sizing : border-box;
  width:100%;
  height: 47px;
  padding : 0rem 1rem;
  margin: ${(props: IStyleProps) => props.margin ?? "0.5rem"};
  border-radius: 0.5rem;
  background-color: ${props => props.theme.color.bgWhite};
  
  color: ${props => props.theme.color.black};
  font-size:${props => props.theme.fontSize.large};
  font-weight: bold;
  cursor: text;
  ${props => props.theme.shadow};

  :hover,:focus{
    filter:brightness(1.2)
  }
`
export default Input