export type TColor =
  | 'primary1'
  | 'primary2'
  | 'primary3'
  | 'red'
  | 'bgWhite'
  | 'white'
  | 'black'
  | 'gray1'
  | 'gray2'
  | 'gray3'
  | 'gray4'
  | 'gray5'
  | 'yellow'
  | 'mint';
export type TFontSize = 'small' | 'normal' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge' | 'title';
export type TSize = 'small' | 'normal' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge';
export type TFlex = 'center' | 'rowCenter' | 'columnCenter' | 'row' | 'column';
export type TScrollbar = 'primary1' | 'primary2' | 'primary3';

const color: { [key in TColor]: string } = {
  primary1: '#5865F2',
  primary2: '#0A127C',
  primary3: '#BDD4E0',
  red: '#FF5656',
  yellow: '#FBED6F',
  mint: '#9BE3E3',
  bgWhite: '#F6F6F6',
  white: '#FFFFFF',
  black: '#222222',
  gray1: '#888888',
  gray2: '#BBBBBB',
  gray3: '#D7D7D7',
  gray4: '#EEEEEE',
  gray5: '#BBBBBB55',
};

const calcRem = (px: number) => `${px / 16}rem`;

const fontSize: { [key in TFontSize]: string } = {
  small: calcRem(14),
  normal: calcRem(16),
  large: calcRem(18),
  xlarge: calcRem(20),
  xxlarge: calcRem(22),
  xxxlarge: calcRem(24),
  title: calcRem(36),
};

const padding: { [key in TSize]: string } = {
  small: calcRem(8),
  normal: calcRem(10),
  large: calcRem(12),
  xlarge: calcRem(14),
  xxlarge: calcRem(16),
  xxxlarge: calcRem(18),
};

const margin: { [key in TSize]: string } = {
  small: calcRem(8),
  normal: calcRem(10),
  large: calcRem(12),
  xlarge: calcRem(14),
  xxlarge: calcRem(16),
  xxxlarge: calcRem(18),
};

const flex: { [key in TFlex]: string } = {
  column: `
    display:flex;
    flex-direction:column;
  `,
  row: `
    display:flex;
    flex-direction:row;
  `,
  columnCenter: `
    display:flex;
    flex-direction:column;
    align-items:center;
  `,
  rowCenter: `
    display:flex;
    flex-direction:row;
    align-items:center;
  `,
  center: `
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
  `,
};

const shadow = `box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)`;
const absoluteCenter = `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  `;

const nodeBgColors = [color.primary1, color.red, color.yellow, color.mint];
const nodeColors = [color.white, color.white, color.black, color.black];
const nodeFontSizes = [fontSize.large, fontSize.normal, fontSize.small, fontSize.small];

const scrollStyle = (backgroundColor: string) => `
  ::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    border-radius: 1ex;
    -webkit-border-radius: 1ex;
    background-color: #BBBBBB;
  }
  ::-webkit-scrollbar-thumb {
    background: ${backgroundColor};
    border-radius: 1ex;
    -webkit-border-radius: 1ex;
  } 
  `;
const customScrollbar: { [key in TScrollbar]: string } = {
  primary1: scrollStyle(color.primary1),
  primary2: scrollStyle(color.primary2),
  primary3: scrollStyle(color.primary3),
};

const HEADER_HEIGHT = '2rem';

const common = {
  color,
  fontSize,
  padding,
  margin,
  flex,
  shadow,
  absoluteCenter,
  nodeBgColors,
  nodeColors,
  nodeFontSizes,
  customScrollbar,
  HEADER_HEIGHT,
};

export default common;
