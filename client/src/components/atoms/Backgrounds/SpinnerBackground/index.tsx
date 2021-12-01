import styled from '@emotion/styled';
import './index.css';

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

function Spinner() {
  return (
    <Container>
      <div className='loader'>Loading...</div>
    </Container>
  );
}

export default Spinner;
