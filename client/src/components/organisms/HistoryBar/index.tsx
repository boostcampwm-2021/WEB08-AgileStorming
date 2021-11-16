import { whiteCloseBtn } from 'img';
import useLinkClick from 'hooks/useLinkClick';
import { Wrapper, UpperDiv } from './style';
import { Title } from 'components/atoms';
import { HistoryLog, IconButton, PlayController, HistoryWindow } from 'components/molecules';
import { IUser } from 'types/user';
import { TDataTypes } from 'recoil/history';
import { useState } from 'react';

export interface IHistoryData {
  nodeFrom?: number;
  nodeTo?: number;
  dataTo?: TDataTypes;
  dataFrom?: TDataTypes;
  user: IUser;
  type: 'ADD_NODE' | 'DELETE_NODE' | 'UPDATE_NODE_PARENT' | 'UPDATE_NODE_SIBLING' | 'UPDATE_NODE_CONTENT' | 'UPDATE_NODE_INFORMATION';
}

const dummyUser = {
  id: 'lapa',
  name: 'lapa',
  color: 'blue',
  icon: 'frog',
} as const;

const dummy = [
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
  { user: dummyUser, type: 'ADD_NODE', nodeFrom: 1, dataTo: { content: 'dummy data', children: '[]' } } as const,
];

const HistoryBar: React.FC = () => {
  const handleCloseHistoryBtnClick = useLinkClick('mindmap');
  const [currentHistory, setCurrentHistory] = useState<IHistoryData>(dummy[0]);

  const handleHistoryClick = (historyData: IHistoryData, idx: number) => () => {
    setCurrentHistory(historyData);
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
      <HistoryWindow onClick={handleHistoryClick} histories={dummy} />
      <HistoryLog history={currentHistory} />
    </Wrapper>
  );
};

export default HistoryBar;
