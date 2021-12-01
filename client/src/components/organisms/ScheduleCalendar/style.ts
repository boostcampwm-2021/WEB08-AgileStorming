import styled from '@emotion/styled';

const Wrapper = styled.div`
  ${({ theme }) => theme.flex.columnCenter};

  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;

  .blur {
    opacity: 0.5;
  }
  .no-click {
    pointer-events: none;
  }
`;

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 70rem;
  margin: 1.5rem 0 1rem 0;
  background-color: ${({ theme }) => theme.color.white};
  border-left: 1px solid ${({ theme }) => theme.color.gray3};
  border-radius: 0.5rem;
  overflow: hidden;
  ${({ theme }) => theme.shadow};
`;

const LayerWrapper = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 70rem;
  top: 9.6rem;

  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;
  white-space: nowrap;

  border-radius: 0.5rem;
  overflow: hidden;
`;

export { Wrapper, CalendarWrapper, LayerWrapper };
