import styled from '@emotion/styled';
import { LayerDay } from 'components/atoms';

const LayerSprintDayWrapper = styled(LayerDay)`
  opacity: 0.4;

  .start {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  .end {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;

const LayerSprint = styled.div<{ color: string }>`
  width: 100%;
  height: 1.2rem;
  background-color: ${({ color }) => `#${color}`}; ;
`;

export { LayerSprintDayWrapper, LayerSprint };
