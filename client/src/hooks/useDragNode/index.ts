import React, { useRef } from 'react';
import useEvents, { EventElems } from 'hooks/useEvents';

export interface IEvents {
  [key: string]: any;
}

const useDragNode = (events: IEvents, dragEnterColor = 'none') => {
  const draggedRef = useRef<HTMLElement | null>(null);
  const isInteractable = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const id = target?.id?.match('container');
    return target.id && !id;
  };

  const handleDragStartNode = (event: React.MouseEvent) => {
    if (!isInteractable(event)) return;
    draggedRef.current = event.target as HTMLElement;
    (event.target as HTMLElement).style.opacity = '0.5';
    if (events.dragstart) events.dragstart(event);
  };

  const handleDragEnterNode = (event: React.MouseEvent) => {
    if (!isInteractable(event)) return;
    (event.target as HTMLElement).style.background = dragEnterColor;
    if (events.dragenter) events.dragenter(event);
  };

  const handleDragOverNode = (event: React.MouseEvent) => {
    if (!isInteractable(event)) return;
    event.preventDefault();
    if (events.dragover) events.dragover(event);
  };

  const handleDragLeaveNode = (event: React.MouseEvent) => {
    if (!isInteractable(event)) return;
    (event.target as HTMLElement).style.background = '';
    if (events.dragleave) events.dragleave(event);
  };

  const handleDragEndNode = (event: React.MouseEvent) => {
    if (!isInteractable(event)) return;
    (event.target as HTMLElement).style.opacity = '';
    draggedRef.current = null;
    if (events.dragend) events.dragend(event);
  };

  const handleDrop = (event: React.MouseEvent) => {
    if (!draggedRef.current || !isInteractable(event)) return;
    (event.target as HTMLElement).style.background = '';
    if (events.drop) events.drop(event, draggedRef.current);
  };

  const dragEvents: EventElems = [
    ['dragstart', handleDragStartNode],
    ['dragend', handleDragEndNode],
    ['dragover', handleDragOverNode],
    ['dragenter', handleDragEnterNode],
    ['dragleave', handleDragLeaveNode],
    ['drop', handleDrop],
  ];
  useEvents(dragEvents);
};

export default useDragNode;
