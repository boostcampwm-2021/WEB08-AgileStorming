import { MouseEvent, useState } from 'react';
import { whiteCloseBtn } from 'img';
import useLinkClick from 'hooks/useLinkClick';
import { Wrapper, UpperDiv } from './style';
import { Title } from 'components/atoms';
import { HistoryLog, IconButton, PlayController, HistoryWindow } from 'components/molecules';
import { IDescription } from 'components/molecules/HistoryLog';

export interface IHistoryData extends IDescription {
  from: number;
  target: number;
  to?: number;
  posX?: number;
  posY?: number;
}

const getUser = (id: number) => ({ id: id, icon: whiteCloseBtn, color: 'blue', name: 'lapa' });
const dummyData = [
  { modifier: getUser(1), type: 'UPDATE_NODE_POSITION', from: 7, to: 9, target: 11, content: 'TASK' } as const,
  { modifier: getUser(1), type: 'ADD_NODE', from: 8, target: 19, content: 'TASK' } as const,
  { modifier: getUser(1), type: 'ADD_NODE', from: 4, target: 18, content: 'TASK' } as const,
];

const HistoryBar: React.FC = () => {
  const handleCloseHistoryBtnClick = useLinkClick('mindmap');
  const [currentDescription, setCurrentDescription] = useState<IDescription | null>(null);

  const handleHistoryClick = (historyData: IHistoryData, idx: number) => (event: MouseEvent) => {
    const { modifier, type, content, from, to, target, posX, posY } = historyData;
    setCurrentDescription({ modifier, type, content });
  };

  return (
    <Wrapper>
      <UpperDiv>
        <Title titleStyle='xxxlarge' color='white'>
          History
        </Title>
        <PlayController />
        <IconButton imgSrc={whiteCloseBtn} onClick={handleCloseHistoryBtnClick} altText='히스토리 닫기 버튼'></IconButton>
      </UpperDiv>
      <HistoryWindow onClick={handleHistoryClick} histories={dummyData} />
      <HistoryLog description={currentDescription} />
    </Wrapper>
  );
};

export default HistoryBar;

const restoreHistory = (historyData: IHistoryData) => {};

const restoreFunctions = {
  ADD_NODE: ({ from, content, target }: IHistoryData) => {},
  DELETE_NODE: () => {},
  UPDATE_NODE_POSITION: ({ from, to, target, content }: IHistoryData) => {},
  UPDATE_NODE_CONTENT: () => {},
};
