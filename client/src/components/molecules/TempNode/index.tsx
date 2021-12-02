import React, { FormEvent } from 'react';
import { Node, Input } from 'components/atoms';
import { INodeProps } from 'components/atoms/Node';

interface IProps extends INodeProps {
  onBlur: ({ currentTarget }: FormEvent<HTMLInputElement>) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  id: string;
  refProp: React.MutableRefObject<HTMLDivElement | null>;
}

const TempNode: React.FC<IProps> = (props) => {
  const { onBlur, onKeyPress, level, isSelected, id, refProp } = props;

  return (
    <Node ref={refProp} id={id} level={level} isSelected={isSelected} isFiltered={true}>
      <Input inputStyle='small' autoFocus onBlur={onBlur} onKeyPress={onKeyPress} />
    </Node>
  );
};

export default TempNode;
