import styled from '@emotion/styled';

interface IStyledToast {
  show: boolean;
}

const StyledToastContainer = styled.div`
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
`;

const StyledToast = styled.div<IStyledToast>`
  ${({ theme }) => theme.flex.columnCenter}
  position: sticky;
  top: 0;
  margin: 0.5rem;
  padding: ${({ theme }) => theme.padding.large};
  border-radius: 8px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.normal};
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.black};
  opacity: ${({ show }) => (show ? '0.7' : '0')};
  visibility: ${({ show }) => (show ? null : 'hidden')};
  transition: ${({ show }) => (show ? 'opacity 300ms' : 'opacity 200ms, visibility 200ms')};
`;

export { StyledToastContainer, StyledToast };
