import { IconWrapper, Wrapper } from './style';
import { closeIcon } from 'img';
import { IconImg } from 'components/atoms';
import { useEffect, useRef } from 'react';

const HistoryWindow = () => {
  const scrollRef = useRef(null);
  const data = dummy;

  useEffect(() => {
    if (!scrollRef.current) return;
    (scrollRef.current as HTMLElement).scrollIntoView();
  }, [scrollRef.current]);

  return (
    <Wrapper>
      {data.map(({ icon, color }, idx) => (
        <IconWrapper key={idx} color={color}>
          <IconImg imgSrc={icon} altText={`히스토리 ${idx + 1}`} />
        </IconWrapper>
      ))}
      <div ref={scrollRef} id='scrollEnd' />
    </Wrapper>
  );
};

export default HistoryWindow;

const dummy = [
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'skyblue' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
  { icon: closeIcon, color: 'red' },
];
