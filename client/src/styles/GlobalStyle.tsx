import React, { FC } from 'react';
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';

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

const GlobalStyle: FC = () => {
  return <Global styles={global} />;
};

export default GlobalStyle;
