import emotionReset from 'emotion-reset';
import { css } from '@emotion/react';

const global = css`
  ${emotionReset}
  *, *::after, *::before {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font: Noto Sans KR;
    font-smoothing: antialiased;
  }
`;

export default global;
