import '@emotion/react';
import * as Types from './common';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      [key in Types.TColor]: string;
    };
    fontSize: {
      [key in Types.TFontSize]: string;
    };
    padding: {
      [key in Types.TSize]: string;
    };
    margin: {
      [key in Types.TSize]: string;
    };
    flex: {
      [key in Types.TFlex]: string;
    };
    customScrollbar: {
      [key in Types.TScrollbar]: string;
    };
    shadow: string;
    absoluteCenter: string;
    nodeBgColors: string[];
    nodeColors: string[];
    nodeFontSizes: string[];
    HEADER_HEIGHT: string;
  }
}
