import styled from "@emotion/styled";
import common from "styles/common"

interface IProps {
  margin?: string;
  toLeft?: boolean;
  size?: string;
}

export const Title = styled.div`
margin: ${(props: IProps) => props.margin ?? "0.5rem"};
margin-left: ${(props: IProps) => props.toLeft ? "auto" : ""};
font-size: ${(props: IProps) => props.size ?? common.fontSize.normal};
font-weight: bold;
line-height: 1.2;
`
export default Title