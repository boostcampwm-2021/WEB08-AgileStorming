import styled from '@emotion/styled';

export const StyledProjectCard = styled.div`
  ${({ theme }) => theme.flex.column}
  width: 320px;
  height: 300px;
  background: ${({ theme }) => theme.color.bgWhite};
  border: 1px solid ${({ theme }) => theme.color.gray3};
  border-radius: 5px;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.25));
  margin: 10px;
  overflow: hidden;
  justify-content: space-between;
  :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.bgWhite};
  }
`;

export const StyledLowerWrapper = styled.div`
  ${({ theme }) => theme.flex.row}
  width: 100%;
  justify-content: space-between;
`;

export const StyledRowCenterWrapper = styled.div`
  ${({ theme }) => theme.flex.rowCenter};
  align-items: center;
`;

export const StyledIconContainer = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  align-items: center;
  margin-top: ${({ theme }) => theme.margin.normal};
`;

export const StyledBottomWrapper = styled.div`
  ${({ theme }) => theme.flex.columnCenter};
  overflow: hidden;
  padding: ${({ theme }) => theme.padding.normal};
`;

export const StyledTextContainer = styled.div`
  ${({ theme }) => theme.flex.column};
  width: 100%;
  padding-left: ${({ theme }) => theme.padding.normal};
`;
