import { whiteCloseBtn } from 'img';
import useLinkClick from 'hooks/useLinkClick';
import { Wrapper, UpperDiv } from './style';
import { Title } from 'components/atoms';
import { HistoryLog, IconButton, PlayController, HistoryWindow } from 'components/molecules';
import { useState } from 'react';
import { IHistoryData } from 'recoil/history';

const dummyUser = {
  id: 'lapa',
  name: 'lapa',
  color: 'blue',
  icon: 'frog',
} as const;

const dummy = [
  {
    id: 0,
    projectId: '0',
    user: dummyUser,
    type: 'ADD_NODE',
    data: { nodeFrom: 1, nodeTo: null, dataFrom: null, dataTo: { content: 'dummy data' } },
  } as const,
  {
    id: 0,
    projectId: '0',
    user: dummyUser,
    type: 'ADD_NODE',
    data: { nodeFrom: 1, nodeTo: null, dataFrom: null, dataTo: { content: 'dummy data' } },
  } as const,
  {
    id: 0,
    projectId: '0',
    user: dummyUser,
    type: 'ADD_NODE',
    data: { nodeFrom: 1, nodeTo: null, dataFrom: null, dataTo: { content: 'dummy data' } },
  } as const,
  {
    id: 0,
    projectId: '0',
    user: dummyUser,
    type: 'ADD_NODE',
    data: { nodeFrom: 1, nodeTo: null, dataFrom: null, dataTo: { content: 'dummy data' } },
  } as const,
  {
    id: 0,
    projectId: '0',
    user: dummyUser,
    type: 'ADD_NODE',
    data: { nodeFrom: 1, nodeTo: null, dataFrom: null, dataTo: { content: 'dummy data' } },
  } as const,
  {
    id: 0,
    projectId: '0',
    user: dummyUser,
    type: 'ADD_NODE',
    data: { nodeFrom: 1, nodeTo: null, dataFrom: null, dataTo: { content: 'dummy data' } },
  } as const,
  {
    id: 0,
    projectId: '0',
    user: dummyUser,
    type: 'ADD_NODE',
    data: { nodeFrom: 1, nodeTo: null, dataFrom: null, dataTo: { content: 'dummy data' } },
  } as const,
  {
    id: 0,
    projectId: '0',
    user: dummyUser,
    type: 'ADD_NODE',
    data: { nodeFrom: 1, nodeTo: null, dataFrom: null, dataTo: { content: 'dummy data' } },
  } as const,
  {
    id: 0,
    projectId: '0',
    user: dummyUser,
    type: 'ADD_NODE',
    data: { nodeFrom: 1, nodeTo: null, dataFrom: null, dataTo: { content: 'dummy data' } },
  } as const,
  {
    id: 0,
    projectId: '0',
    user: dummyUser,
    type: 'ADD_NODE',
    data: { nodeFrom: 1, nodeTo: null, dataFrom: null, dataTo: { content: 'dummy data' } },
  } as const,
  {
    id: 0,
    projectId: '0',
    user: dummyUser,
    type: 'ADD_NODE',
    data: { nodeFrom: 1, nodeTo: null, dataFrom: null, dataTo: { content: 'dummy data' } },
  } as const,
  {
    id: 0,
    projectId: '0',
    user: dummyUser,
    type: 'ADD_NODE',
    data: { nodeFrom: 1, nodeTo: null, dataFrom: null, dataTo: { content: 'dummy data' } },
  } as const,
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
