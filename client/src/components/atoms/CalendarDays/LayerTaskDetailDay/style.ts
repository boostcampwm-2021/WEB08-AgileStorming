import styled from '@emotion/styled';
import { LayerDay } from 'components/atoms';

const LayerTaskDetailDayWrapper = styled(LayerDay)`
  padding-top: 3.8rem;
  color: ${({ theme }) => theme.color.white};

  div {
    ${({ theme }) => theme.flex.center};
    width: 100%;
    height: 1.2rem;
    border-radius: 0.5rem;
  }

  hr {
    margin: 0.5rem 0.1rem;
    border-top: dotted 2.5px;
  }

  .created {
    background-color: ${({ theme }) => theme.color.gray1};
  }
  .started {
    background-color: ${({ theme }) => theme.color.primary1};
  }
  .ended {
    background-color: ${({ theme }) => theme.color.primary2};
  }
  .due {
    background-color: ${({ theme }) => theme.color.red};
  }
  .waiting {
    color: ${({ theme }) => theme.color.gray1};
  }
  .working {
    color: ${({ theme }) => theme.color.primary1};
  }
  .resting {
    color: ${({ theme }) => theme.color.primary2};
  }
  .delaying {
    color: ${({ theme }) => theme.color.red};
  }
`;

export { LayerTaskDetailDayWrapper };
