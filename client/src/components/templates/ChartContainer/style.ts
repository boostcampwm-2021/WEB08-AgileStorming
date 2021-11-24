import styled from '@emotion/styled';

export const StyledChartContainer = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  justify-content: center;
  margin: auto;
  width: 100vw;
  height: 100vh;
`;

export const StyledChartBackground = styled.div`
  width: 80%;
  min-width: 600px;
  height: 60%;
  padding: ${({ theme }) => theme.padding.large};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  -webkit-box-shadow: 1px 4px 11px -1px rgba(0, 0, 0, 0.4);
  box-shadow: 1px 4px 11px -1px rgba(0, 0, 0, 0.4);
`;

export const StyledChartHeader = styled.div`
  ${({ theme }) => theme.flex.center}
  width: 80%;
  min-width: 600px;
  height: 60px;
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  -webkit-box-shadow: 1px 4px 11px -1px rgba(0, 0, 0, 0.3);
  box-shadow: 1px 4px 11px -1px rgba(0, 0, 0, 0.3);
`;

export const StyledTitleWrapper = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  margin: 0 auto;
`;

export const StyledTitleUnderline = styled.div`
  width: 100%;
  height: 1px;
  border: 1px solid ${({ theme }) => theme.color.black};
`;
