import styled from '@emotion/styled';
import { LayerDay } from 'components/atoms';

const LayerScheduleDayWrapper = styled(LayerDay)`
  height: 7.7rem;
  margin-top: 1.1rem;
  padding: 0.2rem;
  overflow-y: auto;
  ${({ theme }) => theme.customScrollbar.primary3}
`;

const LayerTask = styled.div<{ delayed?: boolean | null; ended?: boolean | null }>`
  ${({ theme }) => theme.flex.rowCenter}

  span {
    font-weight: normal;
    margin-bottom: 0.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  cursor: pointer;

  color: ${({ theme, delayed, ended }) => {
    if (delayed) {
      return theme.color.red;
    }
    if (ended) {
      return theme.color.primary1;
    }
    return theme.color.gray1;
  }};

  :hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.primary1};
  }
`;

export { LayerScheduleDayWrapper, LayerTask };
