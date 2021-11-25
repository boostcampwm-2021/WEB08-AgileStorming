import styled from '@emotion/styled';

const Wrapper = styled.div`
  ${({ theme }) => theme.flex.row}
  margin: 0.2rem 0;
  gap: 0.3rem;
  flex-wrap: wrap;

  span {
    cursor: pointer;
    :hover {
      filter: brightness(1.1);
    }
  }
`;

export { Wrapper };
