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
  border: 2px solid ${({ theme }) => theme.color.white};
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.color.gray4};
  }
`;
