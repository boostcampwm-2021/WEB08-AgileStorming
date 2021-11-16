import { Wrapper, IconWrapper } from './style';
import { DragTarget, UserIcon } from 'components/atoms';
import { MouseEvent } from 'react';
import { IHistoryData } from 'components/organisms/HistoryBar';
import useDragBackground from 'hooks/useDragBackground';

interface IProps {
  onClick: (historyData: IHistoryData, idx: number) => (event: MouseEvent) => void;
  histories?: IHistoryData[];
}

const HistoryWindow: React.FC<IProps> = ({ onClick, histories }) => {
  const { containerRef, dragRef } = useDragBackground();

  return (
    <Wrapper ref={containerRef} className='background'>
      {histories
        ? histories.map((historyData, idx) => (
            <IconWrapper key={idx} onClick={onClick(historyData, idx)}>
              <UserIcon user={historyData.user} cursor='pointer' />
            </IconWrapper>
          ))
        : null}
      <DragTarget ref={dragRef} />
    </Wrapper>
  );
};

export default HistoryWindow;
