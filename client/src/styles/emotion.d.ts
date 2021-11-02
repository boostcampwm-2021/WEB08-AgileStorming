import '@emotion/react';
import { common } from 'styles';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      primary1: string;
      primary2: string;
      primary3: string;
      red: string;
      bgWhite: string;
      white: string;
      black: string;
      gray1: string;
      gray2: string;
      gray3: string;
    };
    fontSize: {
      small: string;
      normal: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      xxxlarge: string;
      title: string;
    };
    padding: {
      small: string;
      normal: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      xxxlarge: string;
    };
    margin: {
      small: string;
      normal: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      xxxlarge: string;
    };
    flex: {
      column: string;
      row: string;
      columnCenter: string;
      rowCenter: string;
    };
  }
}
