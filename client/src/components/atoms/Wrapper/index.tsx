import styled from '@emotion/styled';
import { TFlex } from 'styles/common';

interface IWrapper {
  flex: TFlex;
}

const Wrapper = styled.div<IWrapper>`
  ${({ theme, flex }) => theme.flex[flex]}
`;

export default Wrapper;
