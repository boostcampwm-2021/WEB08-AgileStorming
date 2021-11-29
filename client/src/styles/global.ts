import emotionReset from 'emotion-reset';
import { css } from '@emotion/react';

const globalStyle = css`
  ${emotionReset}
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  body {
    font-family: 'Noto Sans KR';
  }
`;

export default globalStyle;
