const color = {
  primary1: '#5865F2',
  primary2: '#0A127C',
  primary3: '#BDD4E0',
  red: '#EB5F52',
  bgWhite: '#F6F6F6',
  white: '#FFFFFF',
  black: '#222222',
  gray1: '#888888',
  gray2: '#BBBBBB',
  gray3: '#D7D7D7',
};

const calcRem = (px: number) => `${px / 16}rem`;

const fontSize = {
  small: calcRem(14),
  normal: calcRem(16),
  large: calcRem(18),
  xlarge: calcRem(20),
  xxlarge: calcRem(22),
  xxxlarge: calcRem(24),
  title: calcRem(50),
};

const padding = {
  small: calcRem(8),
  normal: calcRem(10),
  large: calcRem(12),
  xlarge: calcRem(14),
  xxlarge: calcRem(16),
  xxxlarge: calcRem(18),
};

const margin = {
  small: calcRem(8),
  normal: calcRem(10),
  large: calcRem(12),
  xlarge: calcRem(14),
  xxlarge: calcRem(16),
  xxxlarge: calcRem(18),
};

const flex = {
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
    justify-content:center;
  `,
  center: `
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
  `,
};

const common = {
  color,
  fontSize,
  padding,
  margin,
  flex,
};

export default common;
