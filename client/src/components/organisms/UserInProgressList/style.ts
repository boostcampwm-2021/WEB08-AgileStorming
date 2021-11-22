import styled from '@emotion/styled';

export const StyledUserInProgressContainer = styled.div`
  position: absolute;
  left: 100%;
  top: 0;
  padding: ${({ theme }) => theme.padding.xlarge};
  padding-top: 0;
`;

export const StyledUserInProgressBackground = styled.div`
  ${({ theme }) => theme.flex.column}
  width: 200px;
  max-height: 500px;
  ${({ theme }) => theme.shadow};
  padding: ${({ theme }) => theme.padding.large};
  margin: 0;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 0.5rem;
`;

export const StyledDivider = styled.div`
  width: 100%;
  height: 2px;
  border-top: 2px solid ${({ theme }) => theme.color.primary2};
  margin: 3px 0;
`;

export const StyledTask = styled.div`
  ${({ theme }) => theme.flex.rowCenter}
  width: 90%;
  margin: 3px 0;
`;

export const StyledTextFlow = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.color.black};
  font-size: ${({ theme }) => theme.fontSize.normal};
`;

export const StyledTextButton = styled.div`
  color: ${({ theme }) => theme.color.primary2};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;
  margin: auto 0 0 auto;
  cursor: pointer;
`;
