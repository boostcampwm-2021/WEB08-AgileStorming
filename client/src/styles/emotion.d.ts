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
    shadow: string;
  }
}
