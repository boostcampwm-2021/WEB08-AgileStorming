import styled from '@emotion/styled';

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
    pointer-events: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    :first-of-type {
      font-weight: bold;
    }
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

export { TaskRow };
