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
