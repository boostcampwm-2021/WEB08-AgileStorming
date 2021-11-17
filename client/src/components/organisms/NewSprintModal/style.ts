import styled from '@emotion/styled';

export const SplitDiv = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 47% auto;
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
