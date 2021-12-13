import { ThemeProvider } from '@emotion/react';
import { render } from '@testing-library/react';
import React from 'react';
import { common } from 'styles';

const testRender = (children: React.ReactNode) => {
  return render(<ThemeProvider theme={common}>{children}</ThemeProvider>);
};

export { testRender };
