import { useRecoilValue } from 'recoil';
import { BacklogHeader, BacklogInfo, TableWrapper } from './style';
import { StoryBacklog } from 'components/molecules';
import { mindmapNodesState } from 'recoil/mindmap';
import { filteredTaskTimeState } from 'recoil/project';

const BacklogWrapper = () => {
  const nodeList = useRecoilValue(mindmapNodesState);
  const { totalEstimatedTime, totalUsedTime } = useRecoilValue(filteredTaskTimeState);
  const storyList = Array.from(nodeList.values()).filter((node) => node.level === 'STORY');
  const headerColumn = ['노드', '스토리 & 태스크', '스프린트', '담당자', '중요도', '마감 날짜', '예상 소요 시간', '실제 소요 시간', '라벨'];
  const isOverTime = totalUsedTime - totalEstimatedTime > 0;
  return (
    <>
      <BacklogInfo>
        <span>총 예상시간: {totalEstimatedTime} 시간</span>
        <span>총 소요시간: {totalUsedTime} 시간</span>
        <span className={isOverTime ? 'over' : 'less'}>
          {isOverTime ? '(+' : '('}
          {totalUsedTime - totalEstimatedTime}
          {')'}
        </span>
      </BacklogInfo>
      <TableWrapper>
        <thead>
          <BacklogHeader>
            {headerColumn.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </BacklogHeader>
        </thead>
        <tbody>
          {storyList.map((story) => (
            <StoryBacklog key={story.nodeId} story={story} />
          ))}
        </tbody>
      </TableWrapper>
    </>
  );
};

export default BacklogWrapper;
