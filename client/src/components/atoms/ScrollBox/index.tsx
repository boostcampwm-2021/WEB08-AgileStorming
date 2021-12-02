import styled from '@emotion/styled';

const StyledScrollBox = styled.div`
  width: 100%;
  max-height: 25vh;
  overflow-x: visible;
  overflow-y: scroll;
  ${({ theme }) => theme.customScrollbar.primary3}
`;

export default StyledScrollBox;
