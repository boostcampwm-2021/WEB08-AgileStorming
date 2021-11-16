import styled from '@emotion/styled';

export const FilterMenuHeader = styled.div`
  ${(props) => props.theme.flex.rowCenter};
  gap: 1rem;
  margin: 0.3rem 0;
  font-weight: bold;
  color: ${({ theme }) => theme.color.gray1};

  span {
    cursor: pointer;
  }

  .selected {
    color: ${({ theme }) => theme.color.black};
    text-decoration: underline;
    text-underline-position: under;
  }
`;

export const FilterItem = styled.div`
  padding: 0.3rem 0;
  font-weight: bold;
  padding: 0.3rem 0.1rem;
  border-radius: 0.2rem;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.color.black};
    background-color: ${({ theme }) => theme.color.gray4};
  }
`;

export const SprintItem = styled.div`
  display: grid;
  grid-template-columns: 42% 58%;
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
