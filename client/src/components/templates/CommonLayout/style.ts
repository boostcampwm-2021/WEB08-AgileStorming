import styled from '@emotion/styled';

export const Template = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.bgWhite};
`;

export const LeftInfo = styled.div`
  position: fixed;
  top: 2.2rem;
  left: 0;
  width: 270px;
  padding: 1rem;
  z-index: 1;
`;

export const RightInfo = styled.div`
  position: fixed;
  top: 2.2rem;
  right: 0;
  width: 280px;
  padding: 1rem;
  z-index: 1;
`;
