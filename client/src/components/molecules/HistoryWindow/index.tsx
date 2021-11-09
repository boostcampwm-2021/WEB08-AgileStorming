import styled from '@emotion/styled';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.bgWhite};
  width: 100%;
  margin: 0 2rem;
  height: 70px;
`;

const HistoryWindow = () => {
  return <Wrapper></Wrapper>;
};

export default HistoryWindow;
