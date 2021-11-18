import styled from '@emotion/styled';

export const StyledTaskCard = styled.div`
  ${({ theme }) => theme.flex.column}
  margin: 10px 0px;
  padding: ${({ theme }) => theme.padding.xlarge};
  margin: ${({ theme }) => theme.margin.xxxlarge};
  margin-top: 0;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  -webkit-box-shadow: 1px 4px 11px -1px rgba(0, 0, 0, 0.56);
  box-shadow: 1px 4px 11px -1px rgba(0, 0, 0, 0.56);
`;

export const StyledCardInfoLeft = styled.div`
  ${({ theme }) => theme.flex.column}
  margin: 0 auto 0 0;
`;
export const StyledCardInfoRight = styled.div`
  ${({ theme }) => theme.flex.column}
  margin: 0 auto;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;
