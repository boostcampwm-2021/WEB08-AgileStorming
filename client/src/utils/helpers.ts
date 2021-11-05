enum MINDMAP_BG_SIZE {
  WIDTH = 5000,
  HEIGHT = 5000,
}

const pxToNum = (px: string): number => Number(px.slice(0, -2));
const numToPx = (num: number): string => num + 'px';
const getCenterCoord = (width: number, height: number): number[] => [
  (MINDMAP_BG_SIZE.WIDTH - width) / 2,
  (MINDMAP_BG_SIZE.HEIGHT - height) / 2,
];

const getKoreans = (str: string): [string, RegExpMatchArray] => [str, str.match(/[가-힣]/g) ?? []];
const splitEnAndKo = ([str, koreans]: [string, RegExpMatchArray]): [number, number] => [str.length - koreans.length, koreans.length];
const calculateWidth = ([en, ko]: [number, number]): number => en * 9 + ko * 18 + 20;
const getNodeWidth = (str: string) => calculateWidth(splitEnAndKo(getKoreans(str)));

const getRegexNumber = (nodeId: string) => {
  return Number(nodeId.replace(/[^0-9]/g, ''));
};

export type Levels = 'ROOT' | 'EPIC' | 'STORY' | 'TASK';
type DictType = { [index: number]: string };
const LEVEL_DICT: DictType = { 0: 'ROOT', 1: 'EPIC', 2: 'STORY', 3: 'TASK' };
const idxToLevel = (idx: number) => LEVEL_DICT[idx] as Levels;
const levelToIdx = (level: string) => Object.values(LEVEL_DICT).findIndex((v) => level === v);

export { pxToNum, numToPx, getCenterCoord, getNodeWidth, MINDMAP_BG_SIZE, getRegexNumber, idxToLevel, levelToIdx };
