const pxToNum = (px: string): number => Number(px.slice(0, -2));
const numToPx = (num: number): string => num + 'px';

export { pxToNum, numToPx };
