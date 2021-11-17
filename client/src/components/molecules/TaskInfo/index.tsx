import { SmallText, Wrapper } from 'components/atoms';
import React from 'react';

interface IProps {
  title: string;
  content: string;
}

const TaskInfo: React.FC<IProps> = ({ children, title, content }) => {
  return (
    <Wrapper flex={'rowCenter'}>
      <SmallText color={'black'} margin={'3px 0'} weight={'bold'}>
        {title}
      </SmallText>
      <SmallText color={'black'} margin={'0 0 0 5px'}>
        {content}
      </SmallText>
      {children}
    </Wrapper>
  );
};

export default TaskInfo;
