import { useEffect } from 'react';

export type EventElem = [keyof WindowEventMap, any];
export type EventElems = Array<EventElem>;

const useEvents = (events: Array<EventElem>) => {
  useEffect(() => {
    events.forEach(([eventname, handler]: EventElem) => window.addEventListener(eventname, handler));
    return () => events.forEach(([eventname, handler]: EventElem) => window.removeEventListener(eventname, handler));
  }, [events]);
};

export default useEvents;
