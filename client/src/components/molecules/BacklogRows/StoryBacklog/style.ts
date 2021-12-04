import styled from '@emotion/styled';

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

export { StoryRow };
