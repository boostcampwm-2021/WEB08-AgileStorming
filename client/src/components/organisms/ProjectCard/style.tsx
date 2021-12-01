import styled from '@emotion/styled';

interface IStyledProps {
  color: string;
}

export const StyledProjectCard = styled.div<IStyledProps>`
  ${({ theme }) => theme.flex.column}
  width: 320px;
  height: 300px;
  background: ${({ theme }) => theme.color.bgWhite};
  border: 1px solid ${({ theme }) => theme.color.gray3};
  border-radius: 5px;
  filter: ${({ color }) => `drop-shadow(0px 3px 3px #${color})`};
  margin: 10px;
  overflow: hidden;
  justify-content: space-between;
  :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.bgWhite};
  }
`;

export const StyledLowerContainer = styled.div`
  ${({ theme }) => theme.flex.row}
  width: 100%;
  justify-content: space-between;
`;

export const StyledIconContainer = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  align-items: center;
  margin-top: ${({ theme }) => theme.margin.normal};
`;

export const StyledBottomContainer = styled.div`
  ${({ theme }) => theme.flex.columnCenter};
  overflow: hidden;
  padding: ${({ theme }) => theme.padding.normal};
`;

export const StyledTextContainer = styled.div`
  ${({ theme }) => theme.flex.column};
  width: 100%;
  padding-left: ${({ theme }) => theme.padding.normal};
`;
