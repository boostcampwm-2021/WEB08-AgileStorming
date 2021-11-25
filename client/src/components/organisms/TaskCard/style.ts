import styled from '@emotion/styled';

export const StyledTaskCard = styled.div`
  ${({ theme }) => theme.flex.column}
  padding: ${({ theme }) => theme.padding.large};
  width: 28vw;
  height: 140px;
  min-height: 140px;
  min-width: 280px;
  margin: 0 auto 10px auto;
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

export const StyledTaskTitle = styled.p`
  height: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: bold;
  color: ${({ theme }) => theme.color.primary2};
  line-height: 1.2;
  margin-bottom: 10px;
  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.primary1};
  }
`;

export const StyledIconContainer = styled.div`
  ${({ theme }) => theme.flex.rowCenter};
  margin-top: auto;
  padding: 1px;
  overflow: hidden;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;
