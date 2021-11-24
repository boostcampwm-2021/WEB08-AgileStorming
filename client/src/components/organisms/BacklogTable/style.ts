import styled from '@emotion/styled';

const TableWrapper = styled.table`
  width: 90vw;
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  ${({ theme }) => theme.shadow};
`;

const BacklogInfo = styled.div`
  ${({ theme }) => theme.flex.row};
  margin: 4.8rem auto 0 11rem;
  gap: 1rem;
  color: ${({ theme }) => theme.color.primary2};
  font-size: ${({ theme }) => theme.fontSize.xxlarge};
  font-weight: bold;

  .over {
    color: ${({ theme }) => theme.color.red};
  }
  .less {
    color: ${({ theme }) => theme.color.primary1};
  }
`;

const BacklogHeader = styled.tr`
  display: grid;
  grid-template-columns: 0.5fr 3fr 1fr 1fr 0.6fr 1fr 0.9fr 0.9fr 1.5fr;
  height: 3rem;
  th {
    ${({ theme }) => theme.flex.center};
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.primary1};
    border: 1px solid ${({ theme }) => theme.color.gray3};
    font-weight: bold;
  }
`;

const StoryRow = styled.tr`
  display: grid;
  grid-template-columns: 0.5fr 6.6fr 0.9fr 0.9fr 1.5fr;
  height: 2rem;
  background-color: ${({ theme }) => theme.color.gray4};
  font-size: ${({ theme }) => theme.fontSize.small};

  td {
    ${({ theme }) => theme.flex.center};
    color: ${({ theme }) => theme.color.black};
    border: 1px solid ${({ theme }) => theme.color.gray3};
    font-weight: bold;

    :nth-of-type(2) {
      display: block;
      padding: 0.5rem 0 0 0.5rem;
    }
  }
`;

const TaskRow = styled.tr`
  display: grid;
  grid-template-columns: 0.5fr 3fr 1fr 1fr 0.6fr 1fr 0.9fr 0.9fr 1.5fr;
  height: 2rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  background-color: ${({ theme }) => theme.color.white};
  pointer-events: none;
  cursor: pointer;

  td {
    ${({ theme }) => theme.flex.center};
    color: ${({ theme }) => theme.color.black};
    border: 1px solid ${({ theme }) => theme.color.gray3};
    font-weight: bold;
    pointer-events: auto;
    overflow: hidden;
    text-overflow: ellipsis;

    :nth-of-type(2),
    :last-of-type {
      display: block;
      padding: 0.5rem 0 0 0.5rem;
    }
  }

  :hover {
    background-color: ${({ theme }) => theme.color.gray3};
  }
`;

export { TableWrapper, BacklogInfo, BacklogHeader, StoryRow, TaskRow };
